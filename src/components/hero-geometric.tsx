"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Noto_Sans_JP, Pacifico } from "next/font/google";

const pacifico = Pacifico({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-pacifico",
});

const notoSansJP = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-noto-sans-jp",
});

function ElegantShape({
	className,
	delay = 0,
	width = 400,
	height = 100,
	rotate = 0,
	gradient = "from-white/[0.08]",
}: {
	className?: string;
	delay?: number;
	width?: number;
	height?: number;
	rotate?: number;
	gradient?: string;
}) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: -150,
				rotate: rotate - 15,
			}}
			animate={{
				opacity: 1,
				y: 0,
				rotate,
			}}
			transition={{
				duration: 2.4,
				delay,
				ease: [0.23, 0.86, 0.39, 0.96],
				opacity: { duration: 1.2 },
			}}
			className={cn("absolute", className)}
		>
			<motion.div
				animate={{
					y: [0, 15, 0],
				}}
				transition={{
					duration: 12,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
				style={{
					width,
					height,
				}}
				className="relative"
			>
				<div
					className={cn(
						"absolute inset-0 rounded-full",
						"bg-gradient-to-r to-transparent",
						gradient,
						"backdrop-blur-[2px] border-2 border-white/[0.15]",
						"shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
						"after:absolute after:inset-0 after:rounded-full",
						"after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
					)}
				/>
			</motion.div>
		</motion.div>
	);
}

export default function HeroGeometric({
	title1 = "MyGO",
	title2 = "Shiina Taki",
}: {
	title1?: string;
	title2?: string;
}) {
	const fadeUpVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 1,
				delay: 0.5 + i * 0.2,
				ease: [0.25, 0.4, 0.25, 1],
			},
		}),
	};

	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a14]">
			<div className="absolute inset-0 bg-gradient-to-br from-[#7777AA]/[0.15] via-transparent to-[#FF8899]/[0.15] blur-3xl" />

			<div className="absolute inset-0 overflow-hidden">
				<ElegantShape
					delay={0.3}
					width={600}
					height={140}
					rotate={12}
					gradient="from-[#77BBDD]/[0.15]"
					className="left-[-10%] top-[20%] md:left-[-5%] md:top-1/4"
				/>

				<ElegantShape
					delay={0.5}
					width={500}
					height={120}
					rotate={-15}
					gradient="from-[#FF8899]/[0.15]"
					className="right-[-5%] top-[65%] md:right-0 md:top-[70%]"
				/>

				<ElegantShape
					delay={0.4}
					width={300}
					height={80}
					rotate={-8}
					gradient="from-[#7777AA]/[0.15]"
					className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
				/>

				<ElegantShape
					delay={0.6}
					width={200}
					height={60}
					rotate={20}
					gradient="from-[#FFDD88]/[0.15]"
					className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]"
				/>

				<ElegantShape
					delay={0.7}
					width={150}
					height={40}
					rotate={-25}
					gradient="from-[#77DD77]/[0.15]"
					className="left-[20%] top-[5%] md:left-1/4 md:top-[10%]"
				/>
			</div>

			<div className="container relative z-10 mx-auto px-4 py-8 md:px-6">
				<div className="mx-auto max-w-3xl overflow-visible text-center">
					<motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
						<h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
							<span className="bg-gradient-to-r from-[#3388BB] via-[#5582BB] to-[#7777AA] bg-clip-text text-transparent">
								{title1}
							</span>
							<span className="inline-flex">
								<span className="text-[#FF8899]">!</span>
								<span className="text-[#FFDD88]">!</span>
								<span className="text-[#77BBDD]">!</span>
								<span className="text-[#7777AA]">!</span>
								<span className="text-[#77DD77]">!</span>
							</span>
							<span
								className={cn(
									"bg-clip-text text-transparent bg-gradient-to-r from-[#77BBDD] via-[#FFDD88] to-[#FF8899] pt-8 mt-4 block",
									pacifico.className,
								)}
							>
								{title2}
							</span>
						</h1>
					</motion.div>

					<motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
						<p
							className={cn(
								"text-base sm:text-lg md:text-xl text-white/40 mt-12 mb-8 leading-relaxed font-medium tracking-wide max-w-xl mx-auto px-4",
								notoSansJP.className,
							)}
						>
							お姉ちゃんや祥子はできて、何で私は…
						</p>
					</motion.div>
				</div>
			</div>

			<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-[#0a0a14]/80" />
		</div>
	);
}
