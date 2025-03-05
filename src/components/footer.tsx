"use client";

import { motion } from "framer-motion";

export default function Footer() {
	return (
		<motion.div
			className="fixed inset-x-0 bottom-0 z-20 bg-black/30 py-3 text-center text-sm text-white/60 backdrop-blur-md"
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1, duration: 0.5 }}
		>
			<div className="space-y-1">
				<p>
					© 2025 Shiina Taki - MyGO!!!!! | 角色版权归 Bushiroad 所有 |
					{" "}
					<a
						href="https://tnxg.top"
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors hover:text-white/80"
					>
						网站维护：天翔TNXG
					</a>
					{" "}
					| QQ群: 790980552
				</p>
				<p className="text-xs text-white/40">
					本网站由MyGO!!!!!粉丝持有并运营，与Bushiroad无任何从属关系。若有版权侵犯问题，请联系
					{" "}
					<a
						href="mailto:tnxg@outlook.jp"
						className="transition-colors hover:text-white/60"
					>
						tnxg@outlook.jp
					</a>
					{" "}
					| 本网站基于AGPL-3.0许可证开源:
					{" "}
					<a
						href="https://github.com/ave-mygo/rikki.top"
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors hover:text-white/50"
					>
						GitHub仓库
					</a>
				</p>
			</div>
		</motion.div>
	);
}
