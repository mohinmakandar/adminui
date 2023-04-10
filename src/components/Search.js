import { useState } from "react";
import "./Search.css"

function Search({data,updateData}){

    const [searchString,setSearchString] = useState("");
    const [timerId,updateTimerId] = useState(""); 

    
    const debounceSearch=(e)=>{
        let text = e.target.value;
        setSearchString(text);
        clearTimeout(timerId);
        let newTimerId = setTimeout(()=>{
            performSearch(e.target.value)
        },500);
        updateTimerId(newTimerId);
    }

    const performSearch=(text)=>{

        text = text.toLowerCase();
        let showFalseCount = 0;


        let updatedArray = data.map((dataItem)=> {

            let name = dataItem.name.toLowerCase();
            let email = dataItem.email.toLowerCase();
            let role = dataItem.role.toLowerCase();
            
            if(name.includes(text) || email.includes(text) || role.includes(text)){
                // console.log(""+dataItem.name);
               dataItem.show=true;
            }
            else{
                dataItem.show=false;
                showFalseCount++;
            }
            
            return dataItem;
        });

        if(showFalseCount!==data.length){
            updateData(updatedArray);
        }
        else{
            alert("No records found");
            setSearchString("");
            let updatedArray = data.map((dataItem)=> {
                dataItem.show=true;
                return dataItem;
            });
            updateData(updatedArray);
        }

    }

    return (
        <div className="Search">
            <input type="text" value={searchString} placeholder="Search by name, email id or role" onChange={(e)=>{debounceSearch(e)}}/>
        </div>
    );


}

export default Search;