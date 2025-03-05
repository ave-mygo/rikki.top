"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Footer from "./footer";
import HeroGeometric from "./hero-geometric";
import ProfilePage from "./profile-page";

export default function FullPageScroll() {
	const [currentPage, setCurrentPage] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);
	const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
	const scrollDirection = useRef(0); // 1 for down, -1 for up
	const lastScrollTime = useRef(Date.now());
	const pages = [<HeroGeometric key="hero" />, <ProfilePage key="profile" />];
	const pagesLength = pages.length;

	// Reset scroll lock after animation completes
	const resetScrollLock = useCallback(() => {
		if (scrollTimeout.current)
			clearTimeout(scrollTimeout.current);
		scrollTimeout.current = setTimeout(() => {
			setIsScrolling(false);
		}, 300); // Reduced from 800ms to 500ms for faster response
	}, []);

	// Handle wheel events for scrolling between pages
	const handleWheel = useCallback(
		(e: WheelEvent) => {
			e.preventDefault();

			// Throttle scroll events
			const now = Date.now();
			if (now - lastScrollTime.current < 100)
				return; // Ignore rapid scroll events
			lastScrollTime.current = now;

			if (isScrolling)
				return;

			const direction = e.deltaY > 0 ? 1 : -1;
			scrollDirection.current = direction;

			if (direction > 0 && currentPage < pagesLength - 1) {
				// Scrolling down
				setIsScrolling(true);
				setCurrentPage(prev => prev + 1);
				resetScrollLock();
			} else if (direction < 0 && currentPage > 0) {
				// Scrolling up
				setIsScrolling(true);
				setCurrentPage(prev => prev - 1);
				resetScrollLock();
			}
		},
		[currentPage, isScrolling, resetScrollLock, pagesLength],
	);

	// Handle keyboard navigation
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (isScrolling)
				return;

			if (e.key === "ArrowDown" || e.key === "PageDown") {
				if (currentPage < pagesLength - 1) {
					scrollDirection.current = 1;
					setIsScrolling(true);
					setCurrentPage(prev => prev + 1);
					resetScrollLock();
				}
			} else if (e.key === "ArrowUp" || e.key === "PageUp") {
				if (currentPage > 0) {
					scrollDirection.current = -1;
					setIsScrolling(true);
					setCurrentPage(prev => prev - 1);
					resetScrollLock();
				}
			}
		},
		[currentPage, isScrolling, pagesLength, resetScrollLock],
	);

	// Handle touch events for mobile
	const touchStartY = useRef(0);

	const handleTouchStart = useCallback((e: TouchEvent) => {
		touchStartY.current = e.touches[0].clientY;
	}, []);

	const handleTouchMove = useCallback(
		(e: TouchEvent) => {
			if (isScrolling)
				return;

			const touchY = e.touches[0].clientY;
			const diff = touchStartY.current - touchY;

			// Require a minimum swipe distance
			if (Math.abs(diff) < 50)
				return;

			const direction = diff > 0 ? 1 : -1;
			scrollDirection.current = direction;

			if (direction > 0 && currentPage < pagesLength - 1) {
				// Swiping up (scrolling down)
				setIsScrolling(true);
				setCurrentPage(prev => prev + 1);
				resetScrollLock();
			} else if (direction < 0 && currentPage > 0) {
				// Swiping down (scrolling up)
				setIsScrolling(true);
				setCurrentPage(prev => prev - 1);
				resetScrollLock();
			}
		},
		[currentPage, isScrolling, pagesLength, resetScrollLock],
	);

	// Add event listeners
	useEffect(() => {
		const wheelHandler = (e: WheelEvent) => handleWheel(e);
		const touchStartHandler = (e: TouchEvent) => handleTouchStart(e);
		const touchMoveHandler = (e: TouchEvent) => handleTouchMove(e);
		const keyDownHandler = (e: KeyboardEvent) => handleKeyDown(e);

		window.addEventListener("wheel", wheelHandler, { passive: false });
		window.addEventListener("touchstart", touchStartHandler, { passive: false });
		window.addEventListener("touchmove", touchMoveHandler, { passive: false });
		window.addEventListener("keydown", keyDownHandler);

		return () => {
			window.removeEventListener("wheel", wheelHandler);
			window.removeEventListener("touchstart", touchStartHandler);
			window.removeEventListener("touchmove", touchMoveHandler);
			window.removeEventListener("keydown", keyDownHandler);
			if (scrollTimeout.current) {
				clearTimeout(scrollTimeout.current);
				setIsScrolling(false); // 确保在组件卸载时重置滚动状态
			}
		};
	}, [handleWheel, handleTouchStart, handleTouchMove, handleKeyDown]);

	// Prevent default scrolling behavior
	useEffect(() => {
		const preventDefault = (e: Event) => {
			e.preventDefault();
		};

		document.body.style.overflow = "hidden";
		document.body.style.height = "100vh";
		document.body.style.margin = "0";
		document.body.style.padding = "0";
		document.documentElement.style.overflow = "hidden";
		document.documentElement.style.height = "100vh";

		window.addEventListener("wheel", preventDefault, { passive: false });
		window.addEventListener("touchmove", preventDefault, { passive: false });

		return () => {
			document.body.style.overflow = "";
			document.body.style.height = "";
			document.body.style.margin = "";
			document.body.style.padding = "";
			document.documentElement.style.overflow = "";
			document.documentElement.style.height = "";

			window.removeEventListener("wheel", preventDefault);
			window.removeEventListener("touchmove", preventDefault);
		};
	}, []);

	const pageVariants = {
		initial: (direction: number) => ({
			opacity: 0,
			y: direction > 0 ? 100 : -100,
		}),
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 20,
				mass: 0.8,
				duration: 0.5,
			},
		},
		exit: (direction: number) => ({
			opacity: 0,
			y: direction > 0 ? -100 : 100,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 20,
				mass: 0.8,
				duration: 0.5,
			},
		}),
	};

	return (
		<div className="h-screen w-full overflow-hidden bg-[#0a0a14]">
			<AnimatePresence initial={false} custom={scrollDirection.current} mode="wait">
				<motion.div
					key={currentPage}
					custom={scrollDirection.current}
					variants={pageVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					className="absolute inset-0"
					style={{ pointerEvents: "auto" }}
				>
					{pages[currentPage]}
				</motion.div>
			</AnimatePresence>

			{currentPage === 0 && (
				<motion.div
					className="absolute inset-x-0 bottom-16 z-20 flex items-center justify-center"
					initial={{ opacity: 0 }}
					animate={{
						opacity: [0.4, 1, 0.4],
						y: [0, 10, 0],
					}}
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "loop",
					}}
				>
					<div className="flex flex-col items-center">
						<p className="mb-2 text-sm text-white/60">向下滑动查看更多</p>
						<ChevronDown className="size-6 text-white/60" />
					</div>
				</motion.div>
			)}

			{currentPage === 1 && (
				<motion.div
					className="absolute inset-x-0 top-8 z-20 flex items-center justify-center"
					initial={{ opacity: 0 }}
					animate={{
						opacity: [0.4, 1, 0.4],
						y: [0, -10, 0],
					}}
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "loop",
					}}
				>
					<div className="flex flex-col items-center">
						<ChevronDown className="size-6 rotate-180 text-white/60" />
						<p className="mt-2 text-sm text-white/60">向上滑动返回</p>
					</div>
				</motion.div>
			)}

			{/* Page indicator dots */}
			<div className="fixed right-8 top-1/2 z-20 -translate-y-1/2">
				<div className="flex flex-col space-y-4">
					{pages.map((_, index) => (
						<button
							type="button"
							key={index === 0 ? "hero-page" : "profile-page"}
							onClick={() => {
								if (!isScrolling) {
									setIsScrolling(true);
									scrollDirection.current = index > currentPage ? 1 : -1;
									setCurrentPage(index);
									resetScrollLock();
								}
							}}
							className={`size-3 rounded-full transition-all duration-300 ${currentPage === index ? "scale-125 bg-white" : "bg-white/30 hover:bg-white/50"
							}`}
							aria-label={`Go to page ${index + 1}`}
						/>
					))}
				</div>
			</div>
			{currentPage === 1 && <Footer />}
		</div>
	);
}
