import { useState } from "react";
import "./Pagination.css";

const Pagination=({data,dataItemsPerPage,setThisPage})=>{

    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    const setNoOfPages = () => {

        
        let filteredData = data.filter((dataItem)=>{return dataItem.show===true});
        let filteredDataLength = filteredData.length;
        let pagesArray=[];
        for(let i=1;i<=Math.ceil(filteredDataLength/dataItemsPerPage);i++){
          pagesArray.push(i);
        }
        
        return pagesArray;
    };
   

    let pages = setNoOfPages();
    let totalNoOfPages = pages.length;

    return (
            <div className="Pagination">
                <button 
                  className="PaginationButton" 
                  onClick={()=>{setThisPage(1); setCurrentPageNumber(1);}}
                >
                  {"<<"}
                </button>
                <button className="PaginationButton" onClick={()=>{
                    if(currentPageNumber-1>0){
                      setThisPage(currentPageNumber-1); 
                      setCurrentPageNumber(currentPageNumber-1)}}
                    }
                >
                    {"<"}
                </button>
               {    
                    pages.map((pageNumber)=>(
                    <button className="PaginationButton" style={currentPageNumber===pageNumber?{color:"white",backgroundColor:"black"}:{}} key={pageNumber} id={pageNumber} onClick={()=>{setThisPage(pageNumber); setCurrentPageNumber(pageNumber);}}>{pageNumber}</button>
               ))
               }
               <button 
                  className="PaginationButton" 
                  onClick={()=>{
                    if(currentPageNumber+1<=pages.length){
                    setThisPage(currentPageNumber+1)
                    setCurrentPageNumber(currentPageNumber+1);
                    }
                  }}
                >
                  {">"}
               </button>
               <button className="PaginationButton" onClick={()=>{setThisPage(pages[totalNoOfPages-1]); setCurrentPageNumber(pages[totalNoOfPages-1]);}}>{">>"}</button> 
            </div>
    );
}

export default Pagination;