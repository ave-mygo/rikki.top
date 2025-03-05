"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Noto_Sans_JP, Noto_Sans_SC } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

const notoSansSC = Noto_Sans_SC({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-noto-sans-sc",
});

const notoSansJP = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-noto-sans-jp",
});

const AUTO_SCROLL_INTERVAL = 5000; // 5 seconds per slide

// Band photos data
const bandPhotos = [
	{
		src: "/b37ecf8b99552b00c8f5a8643841e6001459104794.jpg",
		alt: "MyGO!!!!! 乐队合照 1",
		caption: "主视觉图",
	},
	{
		src: "/1c46a6d08272e185ecdbbdd27bcb44e8.jpg",
		alt: "MyGO!!!!! 乐队合照 2",
		caption: "乐队演出后台合影1",
	},
	{
		src: "/6729ec321bd0bd95cb85fbccf8f1b6ea.jpg",
		alt: "MyGO!!!!! 乐队合照 3",
		caption: "乐队演出后台合影2",
	},
];

export default function ProfilePage() {
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

	// Auto scroll photos
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentPhotoIndex(prev => (prev + 1) % bandPhotos.length);
		}, AUTO_SCROLL_INTERVAL);

		return () => clearInterval(timer);
	}, []);

	const fadeInUpVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				delay: 0.2 + i * 0.1,
				ease: [0.25, 0.4, 0.25, 1],
			},
		}),
	};

	const nextPhoto = () => {
		setCurrentPhotoIndex(prev => (prev + 1) % bandPhotos.length);
	};

	const prevPhoto = () => {
		setCurrentPhotoIndex(prev => (prev - 1 + bandPhotos.length) % bandPhotos.length);
	};

	return (
		<div className="min-h-screen overflow-x-hidden bg-[#0a0a14] text-white">
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#7777AA]/[0.1] via-transparent to-[#FF8899]/[0.1] blur-3xl" />

			<div className="container relative z-10 mx-auto px-4 py-12">
				<div className="grid grid-cols-1 gap-8 pt-12 lg:grid-cols-3 lg:gap-12">
					{/* Left column - Photos */}
					<div className="lg:col-span-1">
						<motion.div custom={0} variants={fadeInUpVariants} initial="hidden" animate="visible" className="space-y-8">
							{/* Personal photo - smaller size */}
							<div className="mx-auto max-w-[250px] overflow-hidden rounded-xl bg-gradient-to-r from-[#77BBDD] via-[#FFDD88] to-[#FF8899] p-[2px]">
								<div className="rounded-xl bg-[#0a0a14]/90 p-2">
									<div className="relative aspect-[3/4] overflow-hidden rounded-lg">
										<Image
											src="/0a189567d401f09976e4679bdce8b66e.png"
											alt="椎名立希个人照"
											fill
											className="object-cover"
										/>
										<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0a14] to-transparent p-4">
											<h3 className={cn("text-xl font-bold text-white", notoSansJP.className)}>椎名立希</h3>
											<p className={cn("text-sm text-white/70", notoSansSC.className)}>MyGO!!!!! 鼓手</p>
										</div>
									</div>
								</div>
							</div>

							{/* Band photos carousel - larger size */}
							<div className="w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#77DD77] via-[#7777AA] to-[#77BBDD] p-[2px]">
								<div className="rounded-xl bg-[#0a0a14]/90 p-2">
									<div className="relative aspect-video overflow-hidden rounded-lg">
										{/* Carousel */}
										<div className="group relative size-full">
											{bandPhotos.map((photo, index) => (
												<div
													key={photo.src}
													className={`absolute inset-0 transition-opacity duration-500 ${index === currentPhotoIndex ? "opacity-100" : "pointer-events-none opacity-0"
													}`}
												>
													<Image src={photo.src} alt={photo.alt} fill className="object-cover" />
													<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0a14] to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
														<h3 className={cn("text-xl font-bold text-white", notoSansSC.className)}>MyGO!!!!!</h3>
														<p className={cn("text-sm text-white/70", notoSansSC.className)}>{photo.caption}</p>
													</div>
												</div>
											))}

											{/* Carousel controls */}
											<button
												type="button"
												onClick={prevPhoto}
												className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 opacity-0 transition-all duration-300 hover:bg-black/50 group-hover:opacity-100"
												aria-label="Previous photo"
											>
												<ChevronLeft className="size-5 text-white" />
											</button>
											<button
												type="button"
												onClick={nextPhoto}
												className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 opacity-0 transition-all duration-300 hover:bg-black/50 group-hover:opacity-100"
												aria-label="Next photo"
											>
												<ChevronRight className="size-5 text-white" />
											</button>

											{/* Carousel indicators */}
											<div className="absolute inset-x-0 bottom-16 flex justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
												{bandPhotos.map((photo, index) => (
													<button
														type="button"
														key={photo.src}
														onClick={() => setCurrentPhotoIndex(index)}
														className={`size-2 rounded-full transition-all ${index === currentPhotoIndex ? "scale-125 bg-white" : "bg-white/50"
														}`}
														aria-label={`Go to photo ${index + 1}`}
													/>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</div>

					{/* Right column - Profile information */}
					<div className="lg:col-span-2">
						<div className={cn("space-y-8", notoSansSC.className)}>
							<motion.div custom={1} variants={fadeInUpVariants} initial="hidden" animate="visible">
								<h2 className="mb-4 inline-block bg-gradient-to-r from-[#77BBDD] to-[#FF8899] bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
									个人简介
								</h2>
								<div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
									<p className="leading-relaxed text-white/80">
										我是椎名立希，花咲川女子学园高中一年级的学生。出生于 8 月 9 日，身高 156cm。目前在 MyGO!!!!!
										乐队中担任鼓手，同时也负责作曲工作。
									</p>
								</div>
							</motion.div>

							<motion.div custom={2} variants={fadeInUpVariants} initial="hidden" animate="visible">
								<h2 className="mb-4 inline-block bg-gradient-to-r from-[#FFDD88] to-[#77DD77] bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
									成长背景
								</h2>
								<div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
									<p className="leading-relaxed text-white/80">
										我出身于东京的小康家庭，有一个大我四岁的优秀姐姐。
										她曾担任羽丘女子学园吹奏部部长，在地区管弦乐团比赛中荣获第一名。
										在姐姐的光环下，我常常被忽视，甚至被当作姐姐的陪衬，这让我一度自我怀疑且十分迷茫，心理状态也受到了影响。
									</p>
								</div>
							</motion.div>

							<motion.div custom={3} variants={fadeInUpVariants} initial="hidden" animate="visible">
								<h2 className="mb-4 inline-block bg-gradient-to-r from-[#7777AA] to-[#77BBDD] bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
									乐队生涯
								</h2>
								<div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
									<p className="leading-relaxed text-white/80">
										我在 LiveHouse "RiNG" 兼职做工作人员，不过我并不擅长接待客人。
										后来，我加入了 MyGO!!!!!。在乐队中，拿到灯创作的歌词后，我会努力创作出贴合其世界观的歌曲。
										为了让乐队能够拥有正常现场演出的实力，我曾给自己施加了很大压力，一晚上疯狂编曲子，还因各种客观因素反复修改。
										虽然过程很艰难，但我也在这个过程中不断成长。
									</p>
								</div>
							</motion.div>

							<motion.div custom={4} variants={fadeInUpVariants} initial="hidden" animate="visible">
								<h2 className="mb-4 inline-block bg-gradient-to-r from-[#FF8899] to-[#FFDD88] bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
									个人喜好
								</h2>
								<div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
									<p className="leading-relaxed text-white/80">
										我非常喜欢杏仁豆腐，那细腻的口感和独特的风味让我着迷。
										我对熊猫周边有着浓厚的兴趣，热衷于收集各种可爱的熊猫相关物品。
										曾经因为我的名字"たき" 被人捉弄过，所以不太喜欢香菇（シイタケ）和魔芋丝（しらたき），不过现在对此已经不太在意了。
									</p>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
