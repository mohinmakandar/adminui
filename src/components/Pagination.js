import "./Pagination.css";

const Pagination=({data,dataItemsPerPage,setThisPage,selectedRowIds})=>{

    const setNoOfPages = () => {

        
        let filteredData = data.filter((dataItem)=>{return dataItem.show===true});
        let pagesArray=[];
        for(let i=1;i<=Math.ceil(filteredData.length/dataItemsPerPage);i++){
          pagesArray.push(i);
        }
        
        return pagesArray;
    };

    let pages = setNoOfPages();

    return (
            <div className="Pagination">
               {
                    pages.map((pageNumber)=>(
                    <button className="PaginationButton" key={pageNumber} id={pageNumber} onClick={()=>{setThisPage(pageNumber);}}>{pageNumber}</button>
               ))
               }
                
            </div>
    );
}

export default Pagination;