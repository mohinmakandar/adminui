import "./Icons.css";
function Icons({id,isDisabled,saveRowData,editRowData,deleteRowData}){  //Edit and Save Icons are styled and conditionally rendered

    return(
        <div className="Icons">
            {isDisabled?  //If textField is disabled, then show Edit Icon, else show Save Icon
                <button className="ButtonIcon" id={id} value ="btn" onClick={(e)=>{editRowData(id);}}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                :
                <button className="ButtonIcon" value={id} onClick={(e)=>{saveRowData(id)}}>
                    <i className="fa fa-floppy-o" aria-hidden="true"></i>
                </button>
            }
            {/*Below button represents delete Icon*/}
            <button className="ButtonIcon" value={id} onClick={(e)=>{deleteRowData(id)}}>
                <i className="fa fa-trash" style={{color:"#dc143c"}} aria-hidden="true"></i>
            </button>
        </div>
        );
}

export default Icons;