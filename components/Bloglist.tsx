'use client'

import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { FaSearch } from 'react-icons/fa'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CardCategory, HoverEffect } from './ui/card-hover-effect'

import img1 from "../public/img1.jpg"
import img2 from "../public/img2.jpg"
import img3 from "../public/img3.jpg"
import img4 from "../public/img4.jpg"


const projects = [
    {
        title: "Mastering the Art of Remote Work",
        description:
        "Strategies for Staying Productive and Connected from Anywhere",
        img: img1,
        link: "https://stripe.com",
        category: "Lifestyle",
    },
    {
      title: "The Ultimate Guide to Vegan Cooking",
      description: "Delicious and Nutritious Recipes for Every Meal",
      img: img2,
      link: "https://netflix.com",
      category: "Startup"
    },
    {
      title: "Exploring the World of Cryptocurrency",
      description:
        "What You Need to Know About Investing in Digital Assets",
        img: img3,
      link: "https://google.com",
      category: "News"
    },
    {
      title: "Mindfulness and Meditation for Beginners",
      description:
        "Simple Practices to Reduce Stress and Improve Well-being",
        img: img4,
      link: "https://meta.com",
      category: "Lifestyle",
    },
    {
      title: "DIY Home Improvement Projects",
      description:
        "Transform Your Space with These Easy and Affordable Ideas",
        img: img2,
      link: "https://amazon.com",
      category: "News",
    },
    {
      title: "Fitness for Busy Professionals",
      description:
        "Quick Workouts and Tips to Stay Fit on a Tight Schedule",
        img: img1,
      link: "https://microsoft.com",
      category: "Lifestyle",
    },
  ];

const Bloglist = () => {
    return (
        <div className="py-5 px-5 md:px-12 lg:px-28 overflow-clip">
            <div className="flex justify-between items-center gap-2">
                <div className="">
                    <Select>
                        <SelectTrigger className="w-auto sm:w-[180px]">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="Technology">Technology</SelectItem>
                                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                                <SelectItem value="Startup">Startup</SelectItem>
                                <SelectItem value="News">News</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-2 sm:gap-3">
                    <Input placeholder='Search'></Input>
                    <div className="flex items-center px-3 border rounded-md hover:scale-105">
                        <FaSearch />
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto sm:px-8 px-0">
                <HoverEffect items={projects} />
            </div>
        </div>
    )
}

export default Bloglist