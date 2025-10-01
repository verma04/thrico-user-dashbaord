"use client";
import React from "react";
import { MapPin, Calendar, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";


const people = [
	{
		id: 1,
		name: "John Doe",
		designation: "Software Engineer",
		image:
			"https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
	},
	{
		id: 2,
		name: "Robert Johnson",
		designation: "Product Manager",
		image:
			"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
	},
	{
		id: 3,
		name: "Jane Smith",
		designation: "Data Scientist",
		image:
			"https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
	},
	{
		id: 4,
		name: "Emily Davis",
		designation: "UX Designer",
		image:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
	},
	{
		id: 5,
		name: "Tyler Durden",
		designation: "Soap Developer",
		image:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
	},
	{
		id: 6,
		name: "Dora",
		designation: "The Explorer",
		image:
			"https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
	},
];

interface ProfileMetaProps {
	location?: string
	connectionAvatars: string[]
}

export function ProfileMeta({ location, connectionAvatars }: ProfileMetaProps) {
	return (
		<div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-2 text-gray-500">
			<span className="flex items-center">
				<MapPin className="w-4 h-4 mr-1" />
				{location}
			</span>
			<span className="flex items-center">
				<Calendar className="w-4 h-4 mr-1" />
				Joined March 2023
			</span>
			<span className="flex items-center">
				<Users className="w-4 h-4 mr-1" />
				<div className="flex -space-x-2 overflow-hidden mr-1">
					{connectionAvatars.map((src, index) => (
						<Avatar key={index} className="w-6 h-6 border-2 border-white">
							<AvatarImage src={src || "/placeholder.svg"} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					))}
				</div>
				{'1,234 connections'}
			</span>
			{/* Animated Tooltip Preview */}
		</div>
	)
}