import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";


function SearchSection() {
    return (
        <div className="pd-2 md:pd-6 border-2px rounded-xl flex flex-row items-center space-between">
            <Input placeholder="Vai para onde?" className="mr-1 border-teal-100 bg-white/80 dark:bg-gray-800/80"/>
            <Button variant="default" className="bg-teal-500" type="submit">
                <SearchIcon className="mr-2 h-4 w-4" />
            </Button>
        </div>
    )
}

export default SearchSection;