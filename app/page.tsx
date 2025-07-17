"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Users, Shield, Star, Menu, X, Play } from "lucide-react"

export default function Royal1899Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [isVideoActive, setIsVideoActive] = useState(true)
  const videoRef = useRef<HTMLIFrameElement>(null)

  const [activeNewsCategory, setActiveNewsCategory] = useState("all")
  const [showAllNews, setShowAllNews] = useState(false)
  const [selectedUpdate, setSelectedUpdate] = useState(null)
  const [videoPopup, setVideoPopup] = useState(null)
  const [showAllGuides, setShowAllGuides] = useState(false)
  const [donatePopup, setDonatePopup] = useState(null)

  const [showingNewsItems, setShowingNewsItems] = useState(3)
  const [showingGuideItems, setShowingGuideItems] = useState(3)
  const [isAnimatingNews, setIsAnimatingNews] = useState(false)
  const [isAnimatingGuides, setIsAnimatingGuides] = useState(false)

  const donateItems = [
    {
      id: 1,
      title: "DONATE RULES",
      description: "გთხოვთ გაითვალისწინოთ შემდეგი მნიშვნელოვანი წესები დონატთან დაკავშირებით",
      price: "",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-kpC5lOi6AxqaLcJ40NPZj2zmBfGMh3.jpeg",
      features: [
        "ნაყიდ დონატზე თანხა უკან არ ბრუნდება - როგორც კი დონატი მეჩნილია, გადახდილი თანხა არ ბრუნდება არავითარ შემთხვევაში.",
        "სერვერიდან გასვლისას თანხის დაბრუნება არ ხდება - თუ მოთამაშე დატოვებს სერვერს ან მიიღო ბანი, თანხა არ დაუბრუნდება.",
        "დონატი არ იცვლება სხვა დონატში - ერთხელ არჩეული დონატი აღარ იცვლება სხვა დონატში – აირჩიე ფრთხილად!",
        "დონატის მიყიდვა სხვა მოთამაშისთვის = ბანი - თუ მოთამაშე შეეცდება საკუთარი დონატის გაყიდვას ან მიცემა ბანი, თანხა არ დაუბრუნდება.",
        "დონატის შეძენით, თქვენ ავტომატურად ეთანხმებით ამ პირობებს. დონატის შეძენით თქვენ ასევე ეხმარებით პროექტს განვითარებაში. გმადლობთ მხარდაჭერისთვის და სასიამოვნო თამაშს გისურვებთ!",
      ],
      details: "დონატის შეძენით, თქვენ ავტომატურად ეთანხმებით ყველა ზემოთ ჩამოთვლილ პირობას. გმადლობთ მხარდაჭერისთვის!",
    },
    {
      id: 2,
      title: "DONATE HORSE",
      description: "ცხენის დონაცია",
      price: "₾25",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame_74.jpg-ydZkoDYDUr01fjE4wEpEY4e6I8b79s.jpeg",
      features: ["უნიკალური ცხენი", "სპეციალური ცხენის აღჭურვილობა", "ცხენის სპეციალური უნარები", "ცხენის დაზღვევა"],
      details:
        "მიიღეთ ექსკლუზიური ცხენი სპეციალური უნარებითა და აღჭურვილობით, რომელიც არ არის ხელმისაწვდომი სხვა მოთამაშეებისთვის.",
    },
    {
      id: 3,
      title: "DONATE ROLE HORSE TRAINER",
      description: "ცხენის მწვრთნელის როლი",
      price: "₾40",
      image: "/images/donate-horse-trainer.png",
      features: [
        "ცხენის მწვრთნელის სტატუსი",
        "ცხენების მწვრთნელობის უფლება",
        "სპეციალური ცხენის ინვენტარი",
        "ცხენების ვაჭრობის ლიცენზია",
      ],
      details: "გახდით ოფიციალური ცხენის მწვრთნელი და მოიპოვეთ უფლება ასწავლოთ და გაყიდოთ ცხენები სხვა მოთამაშეებს.",
    },
    {
      id: 4,
      title: "DONATE ROLE GUNSMITH",
      description: "იარაღის ოსტატის როლი",
      price: "₾50",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame_76.jpg-EcRgSV6RUZUtqggPzRdZfHIQ05ygGd.jpeg",
      features: [
        "იარაღის ოსტატის სტატუსი",
        "იარაღების დამზადების უფლება",
        "სპეციალური იარაღების წარმოება",
        "იარაღების რემონტი",
      ],
      details: "გახდით ოფიციალური იარაღის ოსტატი და მოიპოვეთ უფლება დაამზადოთ და შეაკეთოთ იარაღები.",
    },
    {
      id: 5,
      title: "DONATE RANCH",
      description: "რანჩოს დონაცია",
      price: "₾75",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame_66.jpg-ZwtTWfBfutBqYJXqgXcqsZZGkwxBh6.jpeg",
      features: [
        "პირადი რანჩო",
        "პირუტყვის მოშენების უფლება",
        "რანჩოს მართვის ინსტრუმენტები",
        "სპეციალური რანჩოს ინვენტარი",
      ],
      details: "მიიღეთ საკუთარი რანჩო სადაც შეძლებთ პირუტყვის მოშენებას და მართვას.",
    },
    {
      id: 6,
      title: "DONATE FARM",
      description: "ფერმის დონაცია",
      price: "₾60",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame_82.jpg-CUjs6XS0v7euJiHlIEDDqlig3bC0es.jpeg",
      features: [
        "პირადი ფერმა",
        "მოსავლის მოყვანის უფლება",
        "ფერმის მართვის ინსტრუმენტები",
        "სპეციალური ფერმის ინვენტარი",
      ],
      details: "მიიღეთ საკუთარი ფერმა სადაც შეძლებთ სხვადასხვა კულტურების მოყვანას.",
    },
    {
      id: 7,
      title: "DONATE OWN STORE",
      description: "მაღაზიის დონაცია",
      price: "₾100",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame_80.jpg-itYG2xJ8A91jYxGWum6xTQttBbU1Xg.jpeg",
      features: [
        "პირადი მაღაზია",
        "ვაჭრობის ლიცენზია",
        "მაღაზიის მართვის ინსტრუმენტები",
        "სპეციალური ვაჭრობის ინვენტარი",
      ],
      details: "გახსენით საკუთარი მაღაზია და დაიწყეთ ბიზნესი სხვა მოთამაშეებთან.",
    },
    {
      id: 8,
      title: "DONATE BOAT",
      description: "ნავის დონაცია",
      price: "₾45",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame_81.jpg-bCRaQ2iHRj1ElCWMyYW2Pb0MKcoT2v.jpeg",
      features: ["პირადი ნავი", "წყლის ტრანსპორტი", "ნავის სპეციალური აღჭურვილობა", "თევზაობის ბონუსები"],
      details: "მიიღეთ საკუთარი ნავი წყლის ტრანსპორტისა და თევზაობისთვის.",
    },
    {
      id: 9,
      title: "DONATE CARTS",
      description: "ეტლის დონაცია",
      price: "₾35",
      image: "/images/donate-carts.png",
      features: ["სპეციალური ეტლი", "ტვირთის გადაზიდვის ბონუსები", "ეტლის კასტომიზაცია", "ეტლის დაზღვევა"],
      details: "მიიღეთ სპეციალური ეტლი ტვირთების გადასაზიდად და ვაჭრობისთვის.",
    },
  ]

  const allNews = [
    {
      id: 1,
      date: "20 იანვარი, 2025",
      title: "სერვერის ოფიციალური გახსნა",
      description: "Royal 1899 ოფიციალურად იხსნება 1 აპრილს! მოემზადეთ ველური დასავლეთის თავგადასავლისთვის",
      badge: "მნიშვნელოვანი",
      category: "all",
      detailedInfo: {
        version: "v1.0.0",
        features: [
          "სრული სერვერის ინფრასტრუქტურა",
          "ყველა ძირითადი RP სისტემა",
          "5 მთავარი ქალაქი: Valentine, Strawberry, Rhodes, Saint Denis, Blackwater",
          "სრული ეკონომიკური სისტემა",
          "კანონის აღსრულების სისტემა",
          "ჯგუფური RP მექანიზმები",
        ],
        changelog:
          "ეს არის ჩვენი პირველი ოფიციალური რელიზი. სერვერი მზად არის 150 მოთამაშისთვის და შეიცავს ყველა საჭირო ფუნქციას ავთენტური Wild West RP გამოცდილებისთვის.",
        requirements: "RedM კლიენტი, Discord ანგარიში whitelist-ისთვის",
      },
    },
    {
      id: 2,
      date: "15 იანვარი, 2025",
      title: "ახალი ქალაქი - Valentine",
      description: "Valentine-ის ქალაქი ახლა ხელმისაწვდომია ყველა მოთამაშისთვის",
      badge: "ახალი",
      category: "all",
      detailedInfo: {
        version: "v0.9.5",
        features: [
          "Valentine ქალაქის სრული რეკონსტრუქცია",
          "ახალი NPC-ები და მაღაზიები",
          "Saloon-ში პოკერის მაგიდები",
          "ახალი სამუშაო ადგილები",
          "უნიკალური RP სცენარები Valentine-ისთვის",
        ],
        changelog:
          "Valentine ქალაქი ახლა სრულად ფუნქციონირებს ყველა საჭირო ინფრასტრუქტურით. დაემატა ახალი ბიზნეს შესაძლებლობები და RP ლოკაციები.",
        requirements: "სერვერის v0.9.5+ ვერსია",
      },
    },
    {
      id: 3,
      date: "10 იანვარი, 2025",
      title: "სერვერის განახლება v2.1",
      description: "ახალი ფუნქციები და გაუმჯობესებები დაემატა სერვერს",
      badge: "განახლება",
      category: "all",
      detailedInfo: {
        version: "v2.1.0",
        features: [
          "გაუმჯობესებული ეკონომიკური სისტემა",
          "ახალი ცხოველების მოშენება",
          "განახლებული UI/UX",
          "ოპტიმიზაცია უკეთესი პერფორმანსისთვის",
          "ახალი RP ბრძანებები",
          "Bug fixes და სტაბილურობის გაუმჯობესება",
        ],
        changelog:
          "ეს განახლება მოიცავს მნიშვნელოვან გაუმჯობესებებს სერვერის სტაბილურობასა და მოთამაშეთა გამოცდილებაში. დაფიქსირდა 15+ ბაგი და დაემატა ახალი ფუნქციები.",
        requirements: "ავტომატური განახლება, რესტარტი საჭირო არ არის",
      },
    },
    {
      id: 4,
      date: "8 იანვარი, 2025",
      title: "ახალი RP სისტემები",
      description: "დაემატა ახალი roleplay სისტემები უკეთესი გამოცდილებისთვის",
      badge: "განახლება",
      category: "all",
      detailedInfo: {
        version: "v2.0.5",
        features: [
          "/me და /do ბრძანებების გაუმჯობესება",
          "ახალი ემოციური ანიმაციები",
          "ჯგუფური RP ინსტრუმენტები",
          "Voice Chat ინტეგრაცია",
          "RP სტატისტიკის სისტემა",
          "მენტორობის პროგრამა ახალი მოთამაშეებისთვის",
        ],
        changelog:
          "ეს განახლება ფოკუსირებულია roleplay გამოცდილების გაუმჯობესებაზე. ახალი ინსტრუმენტები დაეხმარება მოთამაშეებს უკეთესი RP-ის შექმნაში.",
        requirements: "კლიენტის განახლება საჭიროა",
      },
    },
    {
      id: 9,
      date: "18 იანვარი, 2025",
      title: "test 1",
      description: "სპეციალური ზამთრის ღონისძიება ყველა მოთამაშისთვის! თოვლიანი ველური დასავლეთის გამოცდილება",
      badge: "ღონისძიება",
      category: "current",
      isActive: false, // Inactive event with video capability
      detailedInfo: {
        version: "Winter Event 2025",
        features: [
          "ზამთრის სპეციალური დეკორაციები",
          "თოვლიანი ამინდის ეფექტები",
          "ზამთრის ტანსაცმელი და აქსესუარები",
          "სპეციალური ზამთრის მისიები",
          "ღონისძიების ექსკლუზიური ნაჩუქრები",
          "ზამთრის ფესტივალი Valentine ქალაქში",
        ],
        changelog:
          "ზამთრის ღონისძიება მოიცავს სპეციალურ ზამთრის ატმოსფეროს, ახალ მისიებს და ექსკლუზიურ ნივთებს. ღონისძიება ჩატარდა იანვრის 18-25 რიცხვებში.",
        requirements: "აქტიური სერვერის წევრობა",
        videoLink: "https://www.youtube.com/watch?v=example123", // Video available for inactive events
      },
    },
    {
      id: 10,
      date: "12 იანვარი, 2025",
      title: "test 2",
      description: "ყოველ კვირას ჩატარდება პოკერის ტურნირი პოკერის ტურნირი Saloon-ში",
      badge: "ღონისძიება",
      category: "current",
      isActive: false, // Inactive event with video capability
      detailedInfo: {
        version: "Weekly Tournament 2025",
        features: [
          "ყოველკვირეული პოკერის ტურნირი",
          "მონაწილეობის ფასი $50 ვირტუალური ფული",
          "გამარჯვებულისთვის სპეციალური ნაჩუქრები",
          "ტურნირის რეიტინგის სისტემა",
          "VIP მოთამაშეებისთვის ბონუსები",
        ],
        changelog:
          "ყოველკვირეული ტურნირი არის რეგულარული ღონისძიება, რომელიც ტარდება ყოველ შაბათს Saloon-ში. მოთამაშეებს შეუძლიათ მონაწილეობა მიიღონ და მოიგონ ღირებული პრიზები.",
        requirements: "მინიმუმ $50 ვირტუალური ფული მონაწილეობისთვის",
        videoLink: "https://www.youtube.com/watch?v=example456", // Video available for inactive events
      },
    },
    // Add a new active event without video
    {
      id: 11,
      date: "25 იანვარი, 2025",
      title: "ახალი აქტიური ღონისძიება",
      description: "ახალი აქტიური ღონისძიება რომელიც ამჟამად მიმდინარეობს სერვერზე",
      badge: "ღონისძიება",
      category: "current",
      isActive: true, // Active event without video
      detailedInfo: {
        version: "Active Event 2025",
        features: [
          "მიმდინარე ღონისძიების ფუნქციები",
          "აქტიური მონაწილეობა",
          "სპეციალური დავალებები",
          "ღონისძიების ნაჩუქრები",
        ],
        changelog: "ეს ღონისძიება ამჟამად აქტიურია და მოთამაშეებს შეუძლიათ მონაწილეობა მიიღონ.",
        requirements: "აქტიური სერვერის წევრობა",
        // No videoLink for active events
      },
    },
  ]

  const filteredNews =
    activeNewsCategory === "all"
      ? allNews.filter((news) => news.category === "all")
      : allNews.filter((news) => news.category === activeNewsCategory)

  const visibleNews = filteredNews.slice(0, showingNewsItems)

  const handleNewsClick = (news) => {
    // Show popup for any news item (all now have detailed info)
    setSelectedUpdate(news)
  }

  const handleDonateClick = (donateItem) => {
    setDonatePopup(donateItem)
  }

  // Enhanced function to get detailed information about any news subcategory
  const getNewsItemDetails = (newsId: number) => {
    const newsItem = allNews.find((item) => item.id === newsId)
    if (!newsItem) return null

    return {
      basicInfo: {
        id: newsItem.id,
        title: newsItem.title,
        description: newsItem.description,
        date: newsItem.date,
        badge: newsItem.badge,
        category: newsItem.category,
        isActive: newsItem.category === "current" ? newsItem.isActive : undefined,
      },
      detailedInfo: newsItem.detailedInfo,
      hasVideo: !!(newsItem.category === "current" && newsItem.detailedInfo.videoLink),
      videoLink: newsItem.category === "current" ? newsItem.detailedInfo.videoLink : null,
      status: {
        isActive: newsItem.category === "current" ? (newsItem.isActive ? "აქტიური" : "არააქტიური") : undefined,
        statusText: newsItem.category === "current" ? (newsItem.isActive ? "აქტიური" : "არააქტიური") : undefined,
        statusColor:
          newsItem.category === "current" ? (newsItem.isActive ? "text-green-400" : "text-gray-400") : undefined,
      },
    }
  }

  // Function to get all active news items
  const getActiveNewsItems = () => {
    return allNews.filter((item) => item.isActive).map((item) => getNewsItemDetails(item.id))
  }

  // Function to get news items by category with detailed info
  const getNewsByCategory = (category: string) => {
    const filtered =
      category === "all"
        ? allNews.filter((item) => item.category === "all")
        : allNews.filter((item) => item.category === category)

    return filtered.map((item) => getNewsItemDetails(item.id))
  }

  // Function to toggle news item active status (for admin purposes)
  const toggleNewsItemStatus = (newsId: number) => {
    const newsIndex = allNews.findIndex((item) => item.id === newsId)
    if (newsIndex !== -1) {
      allNews[newsIndex].isActive = !allNews[newsIndex].isActive
      // You could add state update here if needed for real-time updates
      console.log(`News item ${newsId} status changed to: ${allNews[newsIndex].isActive ? "Active" : "Inactive"}`)
    }
  }

  // Enhanced handleNewsClick function with more detailed information
  const handleEnhancedNewsClick = (news) => {
    const detailedNews = getNewsItemDetails(news.id)
    if (detailedNews) {
      console.log("Detailed News Information:", detailedNews)
      setSelectedUpdate(news) // Keep the existing popup functionality
    }
  }

  // Add after the existing news functions (around line 200), add these new event-specific functions:

  // Enhanced Events feature - provides detailed information about event subcategories
  const getEventDetails = (eventId: number) => {
    const event = allNews.find((item) => item.id === eventId && item.category === "current")
    if (!event) return null

    return {
      eventInfo: {
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
        badge: event.badge,
        isActive: event.isActive,
        type: "ღონისძიება",
      },
      detailedInfo: event.detailedInfo,
      status: {
        isActive: event.isActive,
        statusText: event.isActive ? "აქტიური ღონისძიება" : "დასრულებული ღონისძიება",
        statusColor: event.isActive ? "text-green-400" : "text-red-400",
        statusIcon: event.isActive ? "🟢" : "🔴",
      },
      participation: {
        requirements: event.detailedInfo.requirements,
        hasVideo: !!event.detailedInfo.videoLink,
        videoLink: event.detailedInfo.videoLink || null,
      },
      timeline: {
        startDate: event.date,
        duration: event.isActive ? "მიმდინარე" : "დასრულებული",
        nextUpdate: event.isActive ? "მალე იქნება განახლება" : "ღონისძიება დასრულდა",
      },
    }
  }

  // Get all events with detailed information
  const getAllEventsWithDetails = () => {
    const events = allNews.filter((item) => item.category === "current")
    return events.map((event) => getEventDetails(event.id)).filter(Boolean)
  }

  // Get active events only
  const getActiveEvents = () => {
    return getAllEventsWithDetails().filter((event) => event.status.isActive)
  }

  // Get events by status
  const getEventsByStatus = (isActive: boolean) => {
    return getAllEventsWithDetails().filter((event) => event.status.isActive === isActive)
  }

  // Enhanced event click handler
  const handleEventDetailsClick = (eventId: number) => {
    const eventDetails = getEventDetails(eventId)
    if (eventDetails) {
      console.log("Detailed Event Information:", eventDetails)
      // Find the original news item to show in popup
      const originalEvent = allNews.find((item) => item.id === eventId)
      if (originalEvent) {
        setSelectedUpdate(originalEvent)
      }
    }
  }

  const getVideoEmbedUrl = (url) => {
    if (!url) return null

    // YouTube URL handling
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = ""
      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1].split("&")[0]
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0]
      }
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    }

    // TikTok URL handling
    if (url.includes("tiktok.com")) {
      // For TikTok, we'll use the embed format
      const videoId = url.split("/video/")[1]?.split("?")[0]
      if (videoId) {
        return `https://www.tiktok.com/embed/v2/${videoId}`
      }
    }

    return null
  }

  const handleVideoClick = (videoLink) => {
    const embedUrl = getVideoEmbedUrl(videoLink)
    if (embedUrl) {
      setVideoPopup({
        url: embedUrl,
        isYoutube: videoLink.includes("youtube") || videoLink.includes("youtu.be"),
        isTiktok: videoLink.includes("tiktok.com"),
      })
    }
  }

  // Google Docs links for basic rules
  const basicRulesLinks = {
    "სერვერის ძირითადი წესები":
      "https://docs.google.com/document/d/1R7sKqHCmRKWOiQ0WKysVvmnRNU8UxmmyF_jl7MJH-Dg/edit?tab=t.q1gic37jlsg8#heading=h.j5d05bjerz8j",
    "კრიმინალური ჯგუფების წესები":
      "https://docs.google.com/document/d/1A5rF7LL5oNMWJUTFIDyOj5eBBh35ZwdCOXXafYiHaY0/edit?tab=t.0",
    "ფრაქციის ლიდერების წესები":
      "https://docs.google.com/document/d/1yZTlPnsGyHoDrxTdcXISPiLVp7kKegzWlNyIbBM2u7Q/edit?tab=t.0",
    "ინდიელების წესები": "https://docs.google.com/document/d/1BlY1cX3pkNvutatK9tFX_yGVPIevlGIRKCeXD62G6ww/edit?tab=t.0",
    "მექსიკის წესები": "https://docs.google.com/document/d/14Cu6mNZyEbGDZ4qutKS_ek-ww-ILzzXeraDi5zmg6rI/edit?tab=t.0",
    // Roleplay Guide links - updated with actual URLs
    "ა.შ.შ კონსტიტუცია": "https://docs.google.com/document/d/1TRUDIkB8EbE5MQ-Q-mcxYzvpn2-xTp40iSdi2ryA7Gw/edit?tab=t.0",
    "ა.შ.შ კანონი": "https://docs.google.com/document/d/1N7glXamroSlc7Hb2UfRTbw_8ZZVO4c0WEiyMpW6BEdQ/edit?tab=t.0",
    "სახელმწიფო ორგანოების საქმიანობის კოდექსი":
      "https://docs.google.com/document/d/1HEZTZFqvBWheVP0ZC3rtu3ewQbaB6poLsz4MKfDA3nw/edit?tab=t.0",
  }

  const handleRuleClick = (ruleName) => {
    const link = basicRulesLinks[ruleName]
    if (link) {
      window.open(link, "_blank")
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Control video based on scroll position
      if (currentScrollY > 100 && isVideoActive) {
        setIsVideoActive(false)
        // Pause and mute video when scrolling down
        if (videoRef.current) {
          videoRef.current.src =
            "https://www.youtube.com/embed/lxBrpbarqtQ?autoplay=0&mute=1&loop=1&playlist=lxBrpbarqtQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
        }
      } else if (currentScrollY <= 100 && !isVideoActive) {
        setIsVideoActive(true)
        // Resume and unmute video when back on home screen
        if (videoRef.current) {
          videoRef.current.src =
            "https://www.youtube.com/embed/lxBrpbarqtQ?autoplay=1&loop=1&playlist=lxBrpbarqtQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isVideoActive])

  useEffect(() => {
    if (selectedUpdate || videoPopup || donatePopup) {
      // Disable scrolling when any popup is open
      document.body.style.overflow = "hidden"
    } else {
      // Re-enable scrolling when all popups are closed
      document.body.style.overflow = "unset"
    }

    // Cleanup function to ensure scrolling is re-enabled
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedUpdate, videoPopup, donatePopup])

  const navigation = [
    { id: "home", label: "მთავარი" },
    { id: "about", label: "ველური გზის დასაწყისი" },
    { id: "news", label: "სიახლეები" },
    { id: "guides", label: "გზამკვლევი" },
    { id: "rules", label: "წესები" },
    { id: "faq", label: "FAQ" },
    { id: "gallery", label: "გალერეა" },
    { id: "donate", label: "დონატი" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
    setIsMenuOpen(false)
  }

  const sortedVisibleNews = [...visibleNews].sort((a, b) => {
    // Only sort by active status for "current" category
    if (activeNewsCategory === "current") {
      if (a.isActive && !b.isActive) return -1
      if (!a.isActive && b.isActive) return 1
    }
    return 0
  })

  const allGuides = [
    {
      title: "როგორ დავიწყოთ თამაში",
      description: "ყველაფერი რაც გჭირდებათ სერვერზე შესასვლელად",
      duration: "5:30",
      thumbnail: "/placeholder.svg?height=200&width=350",
      category: "დამწყებთათვის",
      videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "პერსონაჟის შექმნა",
      description: "როგორ შევქმნათ უნიკალური პერსონაჟი",
      duration: "8:15",
      thumbnail: "/placeholder.svg?height=200&width=350",
      category: "პერსონაჟი",
      videoLink: "https://www.youtube.com/watch?v=example123",
    },
    {
      title: "Roleplay საფუძვლები",
      description: "ძირითადი RP წესები და რჩევები",
      duration: "12:45",
      thumbnail: "/placeholder.svg?height=200&width=350",
      category: "RP სახელმძღვანელო",
      videoLink: "https://www.youtube.com/watch?v=example456",
    },
    {
      title: "ეკონომიკა და ვაჭრობა",
      description: "როგორ ვიშოვოთ ფული და ვიყიდოთ ნივთები",
      duration: "7:20",
      thumbnail: "/placeholder.svg?height=200&width=350",
      category: "ეკონომიკა",
      videoLink: "https://www.youtube.com/watch?v=example789",
    },
    {
      title: "ჯგუფური RP",
      description: "როგორ ვითამაშოთ სხვებთან ერთად",
      duration: "10:30",
      thumbnail: "/placeholder.svg?height=200&width=350",
      category: "ჯგუფური თამაში",
      videoLink: "https://www.youtube.com/watch?v=example101",
    },
    {
      title: "კანონი და მართლწესრიგი",
      description: "შერიფის სამსახური და კანონები",
      duration: "9:10",
      thumbnail: "/placeholder.svg?height=200&width=350",
      category: "კანონი",
      videoLink: "https://www.youtube.com/watch?v=example202",
    },
    {
      title: "ცხენების მოვლა",
      description: "როგორ ვუვლიდეთ და ვწვრთნიდეთ ცხენებს",
      duration: "6:45",
      thumbnail: "/placeholder.svg?height=200&width=350",
      category: "ცხენები",
      videoLink: "https://www.youtube.com/watch?v=example303",
    },
    {
      title: "ნადირობა და თევზაობა",
      description: "ველური ბუნების რესურსების გამოყენება",
      duration: "11:20",
      thumbnail: "/placeholder.svg?height=200&width=350",
      category: "ნადირობა",
      videoLink: "https://www.youtube.com/watch?v=example404",
    },
    {
      title: "ბანდების შექმნა",
      description: "როგორ შევქმნათ და ვმართოთ ბანდა",
      duration: "15:30",
      thumbnail: "/placeholder.svg?height=200&width=350",
      category: "ბანდები",
      videoLink: "https://www.youtube.com/watch?v=example505",
    },
  ]

  const visibleGuides = allGuides.slice(0, showingGuideItems)

  const handleShowMoreNews = () => {
    if (showAllNews) {
      // Show Less - reset to 3 items and scroll to news section
      setShowAllNews(false)
      setShowingNewsItems(3)
      // Scroll to news section
      const newsSection = document.getElementById("news")
      if (newsSection) {
        newsSection.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Show More - show all items immediately without effects
      setShowAllNews(true)
      setShowingNewsItems(filteredNews.length)
      setIsAnimatingNews(false)
    }
  }

  const handleShowMoreGuides = () => {
    if (showAllGuides) {
      // Show Less - reset to 3 items and scroll to guides section
      setShowAllGuides(false)
      setShowingGuideItems(3)
      // Scroll to guides section
      const guidesSection = document.getElementById("guides")
      if (guidesSection) {
        guidesSection.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Show More - show all items immediately without effects
      setShowAllGuides(true)
      setShowingGuideItems(allGuides.length)
      setIsAnimatingGuides(false)
    }
  }

  useEffect(() => {
    setShowAllNews(false)
    setShowingNewsItems(3)
    setIsAnimatingNews(false)
  }, [activeNewsCategory])

  return (
    <div className="min-h-screen bg-black text-cream overflow-x-hidden">
      {/* Video Popup */}
      {videoPopup && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
          onClick={() => setVideoPopup(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setVideoPopup(null)}
              className="absolute -top-12 right-0 text-cream/60 hover:text-gold transition-colors p-2 z-10"
            >
              <X size={32} />
            </button>
            <iframe
              src={videoPopup.url}
              className="w-full h-full rounded-lg"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              frameBorder="0"
              style={{
                minHeight: videoPopup.isTiktok ? "600px" : "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Donate Popup */}
      {donatePopup && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setDonatePopup(null)}
        >
          <div
            className="bg-charcoal border border-gold/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gold font-western mb-2">{donatePopup.title}</h2>
                  <p className="text-cream/80">{donatePopup.description}</p>
                  {donatePopup.id !== 1 && (
                    <div className="text-4xl font-bold text-copper mt-4">{donatePopup.price}</div>
                  )}
                </div>
                <button
                  onClick={() => setDonatePopup(null)}
                  className="text-cream/60 hover:text-gold transition-colors p-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gold mb-3 font-western">
                  {donatePopup.id === 1 ? "დეტალები" : "ფუნქციები"}
                </h3>
                <div className="bg-black/30 rounded-lg p-4">
                  <ul className="space-y-2">
                    {donatePopup.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-cream/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Details */}
              {/* Purchase Button - Hide for DONATE RULES */}
              {donatePopup.id !== 1 && (
                <div className="flex justify-center">
                  <Button className="bg-gold hover:bg-copper text-black font-western px-8 py-3 text-lg">
                    შეძენა - {donatePopup.price}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Update Details Popup */}
      {selectedUpdate && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedUpdate(null)}
        >
          <div
            className="bg-charcoal border border-gold/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary" className="bg-gold/20 text-gold border-gold/30">
                      {selectedUpdate.badge}
                    </Badge>
                    <span className="text-sm text-cream/60">{selectedUpdate.date}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gold font-western mb-2">{selectedUpdate.title}</h2>
                  <p className="text-cream/80">{selectedUpdate.description}</p>
                </div>
                <button
                  onClick={() => setSelectedUpdate(null)}
                  className="text-cream/60 hover:text-gold transition-colors p-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Version Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gold mb-3 font-western">ვერსიის ინფორმაცია</h3>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-cream/80">
                    <span className="text-gold font-semibold">ვერსია:</span> {selectedUpdate.detailedInfo.version}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gold mb-3 font-western">ახალი ფუნქციები</h3>
                <div className="bg-black/30 rounded-lg p-4">
                  <ul className="space-y-2">
                    {selectedUpdate.detailedInfo.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-cream/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Video Link - Only for events category */}
              {selectedUpdate.category === "current" && selectedUpdate.detailedInfo.videoLink && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gold mb-3 font-western">ვიდეო</h3>
                  <div className="bg-black/30 rounded-lg p-4">
                    <button
                      onClick={() => handleVideoClick(selectedUpdate.detailedInfo.videoLink)}
                      className="flex items-center gap-3 text-cream/80 hover:text-gold transition-colors group"
                    >
                      <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                        <Play className="text-gold" size={20} />
                      </div>
                      <div>
                        <p className="text-left">
                          <span className="text-gold font-semibold">ღონისძიების ვიდეო:</span>
                        </p>
                        <p className="text-sm text-cream/60">დააკლიკეთ ვიდეოს სანახავად</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Changelog */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gold mb-3 font-western">დეტალური ცვლილებები</h3>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-cream/80 leading-relaxed">{selectedUpdate.detailedInfo.changelog}</p>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gold mb-3 font-western">მოთხოვნები</h3>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-cream/80">{selectedUpdate.detailedInfo.requirements}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-black/90 backdrop-blur-md border-b border-gold/20" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-copper rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gold font-serif">Royal 1899</h1>
                <p className="text-xs text-cream/70">Georgian Wild West</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-8">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group relative py-2 px-4 transition-colors duration-300 ${
                      activeSection === item.id ? "text-gold" : "text-cream hover:text-gold"
                    }`}
                  >
                    <span className="font-medium font-western text-base">{item.label}</span>
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${
                        activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-cream hover:text-gold transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-gold/20">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 px-4 text-cream hover:text-gold hover:bg-gold/10 transition-colors rounded-lg font-western"
                >
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0">
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/lxBrpbarqtQ?autoplay=1&loop=1&playlist=lxBrpbarqtQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
            className="w-full h-full object-cover"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              pointerEvents: "none",
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            frameBorder="0"
          />
          {/* Overlay when video is paused */}
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${
              !isVideoActive ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-gold drop-shadow-lg" size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-black to-charcoal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gold mb-4">ველური გზის დასაწყისი</h2>
            <div className="w-24 h-1 bg-copper mx-auto mb-6" />
            <p className="text-xl text-cream/80 max-w-3xl mx-auto">
              Royal 1899 არის Red Dead Redemption 2 - ის პირველი ქართული RP პროექტი, რომელიც ფუნქციონირებს 2025 წლის 1
              აპრილიდან.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="text-gold" size={32} />,
                title: "ქართული საზოგადოება",
                description:
                  "ჩვენი სერვერი შექმნილია ქართველი გეიმერებისთვის, რომლებიც ეძებენ თავგადასავალს ველური დასავლეთში",
              },
              {
                icon: <Shield className="text-gold" size={32} />,
                title: "საინტერესო გამოცდილება",
                description: "მრავალფეროვანი სიუჟეტებით სავსე 1899 წლის ველური დასავლეთის გარემო",
              },
              {
                icon: <Star className="text-gold" size={32} />,
                title: "უმაღლესი ხარისხი",
                description: "მაღალი ხარისხის სერვერი 24/7 მხარდაჭერით და რეგულარული განახლებებით",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-black/50 border-gold/20 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 group hover:scale-105 cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center group-hover:scale-125 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gold mb-2 font-western">{feature.title}</h3>
                  <p className="text-cream/80">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-charcoal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gold mb-4">სიახლეები</h2>
            <div className="w-24 h-1 bg-copper mx-auto mb-6" />
            <p className="text-xl text-cream/80">უახლესი განახლებები და ღონისძიებები</p>
          </div>

          {/* News Categories */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-4 bg-black/30 rounded-lg p-2">
              <button
                onClick={() => setActiveNewsCategory("all")}
                className={`px-6 py-2 rounded-lg transition-all duration-300 font-western ${
                  activeNewsCategory === "all" ? "bg-gold text-black" : "text-cream hover:text-gold hover:bg-gold/10"
                }`}
              >
                განახლებები
              </button>
              <button
                onClick={() => setActiveNewsCategory("current")}
                className={`px-6 py-2 rounded-lg transition-all duration-300 font-western ${
                  activeNewsCategory === "current"
                    ? "bg-gold text-black"
                    : "text-cream hover:text-gold hover:bg-gold/10"
                }`}
              >
                ღონისძიებები
              </button>
            </div>
          </div>

          {/* News Grid */}
          {activeNewsCategory === "all" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedVisibleNews.map((news, index) => (
                <Card
                  key={news.id}
                  onClick={() => handleEnhancedNewsClick(news)}
                  className={`bg-black/50 border-gold/20 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 group cursor-pointer hover:border-gold/40 ${
                    index >= 3 && index === showingNewsItems - 1 && isAnimatingNews ? "animate-fadeInUp" : ""
                  }`}
                  style={{
                    animationDelay: index >= 3 && index === showingNewsItems - 1 && isAnimatingNews ? `0ms` : "0ms",
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary" className="bg-gold/20 text-gold border-gold/30">
                        {news.badge}
                      </Badge>
                      <span className="text-xs text-cream/60">{news.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gold mb-3 group-hover:text-copper transition-colors font-western">
                      {news.title}
                    </h3>
                    <p className="text-cream/80">{news.description}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <div className="text-xs text-gold/70">დააკლიკეთ დეტალებისთვის</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Events Design */
            <div className="max-w-4xl mx-auto space-y-6">
              {sortedVisibleNews.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="text-gold/50"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gold mb-2 font-western">ღონისძიებები არ არის</h3>
                  <p className="text-cream/60">ამჟამად აქტიური ღონისძიებები არ არის ხელმისაწვდომი</p>
                </div>
              ) : (
                sortedVisibleNews.map((event, index) => (
                  <div
                    key={event.id}
                    onClick={() => handleEnhancedNewsClick(event)}
                    className={`relative bg-gradient-to-r from-black/80 to-charcoal/80 border border-gold/30 rounded-xl p-8 cursor-pointer transition-all duration-300 hover:border-gold/60 hover:shadow-2xl hover:shadow-gold/20 group ${
                      index >= 3 && index === showingNewsItems - 1 && isAnimatingNews ? "animate-fadeInUp" : ""
                    }`}
                    style={{
                      animationDelay: index >= 3 && index === showingNewsItems - 1 && isAnimatingNews ? `0ms` : "0ms",
                    }}
                  >
                    {/* Event Status Indicator */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                          event.isActive
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            event.isActive ? "bg-green-400 animate-pulse" : "bg-red-400"
                          }`}
                        />
                        {event.isActive ? "აქტიური" : "დასრულებული"}
                      </div>
                    </div>

                    {/* Event Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-copper/20 rounded-xl flex items-center justify-center border border-gold/30 group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="text-gold"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M8 2v4" />
                          <path d="M16 2v4" />
                          <rect width="18" height="18" x="3" y="4" rx="2" />
                          <path d="M3 10h18" />
                          <path d="M8 14h.01" />
                          <path d="M12 14h.01" />
                          <path d="M16 14h.01" />
                          <path d="M8 18h.01" />
                          <path d="M12 18h.01" />
                          <path d="M16 18h.01" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="secondary" className="bg-gold/20 text-gold border-gold/30 font-western">
                            {event.badge}
                          </Badge>
                          <span className="text-sm text-cream/60">{event.date}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gold mb-2 group-hover:text-copper transition-colors font-western">
                          {event.title}
                        </h3>
                        <p className="text-cream/80 leading-relaxed">{event.description}</p>
                      </div>
                    </div>

                    {/* Event Features Preview */}
                    {event.detailedInfo && event.detailedInfo.features && (
                      <div className="mb-6">
                        <h4 className="text-lg font-bold text-gold mb-3 font-western">ღონისძიების ფუნქციები:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {event.detailedInfo.features.slice(0, 4).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2 text-sm text-cream/70">
                              <div className="w-1.5 h-1.5 bg-copper rounded-full flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        {event.detailedInfo.features.length > 4 && (
                          <p className="text-xs text-gold/70 mt-2">
                            და კიდევ {event.detailedInfo.features.length - 4} ფუნქცია...
                          </p>
                        )}
                      </div>
                    )}

                    {/* Video Indicator */}
                    {event.category === "current" && event.detailedInfo.videoLink && (
                      <div className="flex items-center gap-2 text-gold/80 text-sm mb-4">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                        <span>ვიდეო ხელმისაწვდომია</span>
                      </div>
                    )}

                    {/* Action Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gold/70 font-western">დააკლიკეთ სრული ინფორმაციისთვის</div>
                      <svg
                        className="text-gold/50 group-hover:text-gold transition-colors"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-copper/50 to-transparent" />
                  </div>
                ))
              )}
            </div>
          )}

          {/* Show More Button */}
          {filteredNews.length > 3 && (
            <div className="text-center mt-12">
              <Button
                onClick={handleShowMoreNews}
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 bg-transparent font-western"
                disabled={isAnimatingNews}
              >
                {showAllNews ? "ნაკლების ჩვენება" : "მეტის ჩვენება"}
                <ChevronDown
                  className={`ml-2 transition-transform duration-300 ${showAllNews ? "rotate-180" : ""}`}
                  size={16}
                />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="py-20 bg-gradient-to-b from-charcoal to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gold mb-4">გზამკვლევი</h2>
            <div className="w-24 h-1 bg-copper mx-auto mb-6" />
            <p className="text-xl text-cream/80">მოკლე ვიდეოები და სახელმძღვანელოები</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleGuides.map((guide, index) => (
              <Card
                key={index}
                onClick={() => handleVideoClick(guide.videoLink)}
                className={`bg-black/50 border-gold/20 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 group cursor-pointer overflow-hidden ${
                  index >= 3 && index === showingGuideItems - 1 && isAnimatingGuides ? "animate-fadeInUp" : ""
                }`}
                style={{
                  animationDelay: index >= 3 && index === showingGuideItems - 1 && isAnimatingGuides ? `0ms` : "0ms",
                }}
              >
                <div className="relative">
                  <img
                    src={guide.thumbnail || "/placeholder.svg"}
                    alt={guide.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="text-gold" size={48} />
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-cream text-xs px-2 py-1 rounded">
                    {guide.duration}
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="bg-gold/20 text-gold border-gold/30 text-xs">
                      {guide.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gold mb-2 group-hover:text-copper transition-colors font-western">
                    {guide.title}
                  </h3>
                  <p className="text-cream/80 text-sm">{guide.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {allGuides.length > 3 && (
            <div className="text-center mt-12">
              <Button
                onClick={handleShowMoreGuides}
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 bg-transparent font-western"
                disabled={isAnimatingGuides}
              >
                {showAllGuides ? "ნაკლების ჩვენება" : "მეტის ჩვენება"}
                <ChevronDown
                  className={`ml-2 transition-transform duration-300 ${showAllGuides ? "rotate-180" : ""}`}
                  size={16}
                />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gold mb-4">წესები</h2>
            <div className="w-24 h-1 bg-copper mx-auto mb-6" />
            <p className="text-xl text-cream/80">სერვერის წესები და RolePlay სახელმძღვანელო</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "ძირითადი წესები",
                  rules: [
                    "სერვერის ძირითადი წესები",
                    "კრიმინალური ჯგუფების წესები",
                    "ფრაქციის ლიდერების წესები",
                    "ინდიელების წესები",
                    "მექსიკის წესები",
                  ],
                  isClickable: true,
                },
                {
                  title: "Roleplay სახელმძღვანელო",
                  rules: ["ა.შ.შ კონსტიტუცია", "ა.შ.შ კანონი", "სახელმწიფო ორგანოების საქმიანობის კოდექსი"],
                  isClickable: true,
                },
              ].map((section, index) => (
                <Card key={index} className="bg-black/50 border-gold/20 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-gold mb-6 font-western">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.rules.map((rule, ruleIndex) => (
                        <li
                          key={ruleIndex}
                          className={`flex items-start ${
                            section.isClickable
                              ? "cursor-pointer hover:text-blue-400 hover:scale-105 transition-all duration-300"
                              : ""
                          }`}
                          onClick={section.isClickable ? () => handleRuleClick(rule) : undefined}
                        >
                          <div className="w-2 h-2 bg-copper rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-cream/80">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-b from-black to-charcoal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gold mb-4">ხშირად დასმული კითხვები</h2>
            <div className="w-24 h-1 bg-copper mx-auto mb-6" />
            <p className="text-xl text-cream/80">FAQ - Frequently Asked Questions</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "როგორ შევუერთდე სერვერს?",
                answer: (
                  <span>
                    სერვერზე შემოსასვლელად პირველ რიგში საჭიროა ჩვენს დისქორდ სერვერზე გაწევრიანება{" "}
                    <a
                      href="https://discord.gg/r1899"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:scale-110 transition-transform duration-300 cursor-pointer inline-block"
                    >
                      Royal1899
                    </a>
                  </span>
                ),
              },
              {
                question: "საჭიროა თუ არა whitelist?",
                answer: "დიახ, ჩვენი სერვერი whitelist-ზეა. განაცხადი უნდა შეავსოთ Discord-ზე.",
              },
              {
                question: "რა ასაკიდან შეიძლება თამაში?",
                answer:
                  "მინიმალური ასაკი არის 15 წელი. ყველა მოთამაშე უნდა იყოს ადეკვატური და პატივი სცეს სხვა მოთამაშეებს",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="bg-black/50 border-gold/20 backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gold mb-2 font-western">{faq.question}</h3>
                  <p className="text-cream/80">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-charcoal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gold mb-4">გალერეა</h2>
            <div className="w-24 h-1 bg-copper mx-auto mb-6" />
            <p className="text-xl text-cream/80">სერვერის მომენტები და სკრინშოტები</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg">
                <img
                  src={`/placeholder.svg?height=300&width=400&query=wild%20west%20roleplay%20screenshot%20${index + 1}`}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg
                    className="text-gold"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-20 bg-gradient-to-b from-charcoal to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gold mb-4">დონატი</h2>
            <div className="w-24 h-1 bg-copper mx-auto mb-6" />
            <p className="text-xl text-cream/80">მხარი დაუჭირეთ სერვერს</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {donateItems.map((item) => (
              <Card
                key={item.id}
                onClick={() => handleDonateClick(item)}
                className="bg-black/50 border-gold/20 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 group cursor-pointer hover:scale-105 relative overflow-hidden h-64"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg
                    className="text-gold"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gold/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gold to-copper rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">R</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gold font-serif">Royal 1899</h3>
                  <p className="text-xs text-cream/70">Georgian Wild West</p>
                </div>
              </div>
              <p className="text-cream/80">ქართული ველური დასავლეთის ყველაზე ავთენტური გამოცდილება RedM-ზე</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
