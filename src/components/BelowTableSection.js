
import "./BelowTableSection.css";
import Pagination from "./Pagination";

function BelowTableSection({data,deleteMultipleRows,dataItemsPerPage,setThisPage}){

    return(
        <div className="BelowTableSection">
        <button className="DeleteButton" onClick={()=>{deleteMultipleRows()}}>Delete</button>
        <Pagination data={data} dataItemsPerPage={dataItemsPerPage} setThisPage={setThisPage} />
        </div>
    );
}

export default BelowTableSection;