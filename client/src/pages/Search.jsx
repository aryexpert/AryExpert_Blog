import { Button, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PostCard } from '../components';

export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTearm: "",
        sort: "desc",
        category: "uncategorized",
    });
    console.log(sidebarData);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        const sortFromUrl = urlParams.get("sort");
        const categoryFromUrl = urlParams.get("category");
        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTearm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            });
        }
        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if (!res.ok) {
                setLoading(false);
                return;
            }
            if(res.ok) {
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);
                if (data.posts.length === 9) {
                    setShowMore(true);
                }else {
                    setShowMore(false);
                }
            }
        };
        fetchPosts();
    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === "searchTerm") {
            setSidebarData({
                ...sidebarData,
                searchTearm: e.target.value,
            });
        }
        if (e.target.id === "sort") {
            const order = e.target.value || "desc";
            setSidebarData({
                ...sidebarData,
                sort: order,
            });
        }
        if (e.target.id === "category") {
            const category = e.target.value || "uncategorized";
            setSidebarData({
                ...sidebarData,
                category
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("searchTerm", sidebarData.searchTearm);
        urlParams.set("sort", sidebarData.sort);
        urlParams.set("category", sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("startIndex", startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
            return;
        }
        if(res.ok) {
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if (data.posts.length === 9) {
                setShowMore(true);
            }else {
                setShowMore(false);
            }
        }
    }

  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap font-semibold'>Termes de recherche:</label>
                    <TextInput placeholder="Search..."
                        id="searchTerm"
                        type="text"
                        value={sidebarData.searchTearm}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className='font-semibold'>Trier:</label>
                    <Select onChange={handleChange}
                        value={sidebarData.sort}
                        id="sort"
                    >
                        <option value="desc">Dernier</option>
                        <option value="asc">Plus ancien</option>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <label className='font-semibold'>Categorie:</label>
                    <Select onChange={handleChange}
                        value={sidebarData.category}
                        id="category"
                    >
                        <option value="uncategorized">Non Classé</option>
                        <option value="celebration">Actualité-IA</option>
                        <option value="priere">Environnement-IA</option>
                        <option value="jeune">IA-Afrique</option>
                    </Select>
                </div>
                <Button type="submit" outline 
                    gradientDuoTone="purpleToPink"
                >
                    Appliquer les filtres
                </Button>
            </form>
        </div>
        <div className="w-full">
            <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
                Résultats du Tri:
            </h1>
            <div className="p-7 flex flex-wrap gap-4">
                {
                    !loading && posts.length === 0 && (
                        <p className='text-xl text-gray-500'>No posts found.</p>
                    )
                }
                {
                    loading && (
                        <p className='text-xl text-gray-500'>Loading...</p>
                    )
                }
                {
                  !loading && posts && posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  )) 
                }
                {
                    showMore && (
                        <button onClick={handleShowMore}
                            className='text-teal-500 text-lg hover:underline p-7 w-full'
                        >
                            Afficher plus
                        </button>
                    )
                }
            </div>
        </div>
    </div>
  )
}
