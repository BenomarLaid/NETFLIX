import React, { useState } from 'react'

const SearchPage = () => {
    const [activeTab, setActiveTab] = useState("movie");
    const [searchTerm, setSearchTerm] = useState("");

    const [results, setResults] = useState([]);
    const [setContentType] = useContentStore();

    


  return (
    <div>SearchPage</div>
  )
}

export default SearchPage