import type { Metadata } from "next";
import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Shiina Taki - MyGO!!!!!",
	description: "It's MyGO!!!!!",
	icons: {
		icon: "/icon.png",
		apple: "/icon.png",
		shortcut: "/icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="zh">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
