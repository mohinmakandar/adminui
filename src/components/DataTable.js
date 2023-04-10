
import "./DataTable.css";
import Icons from "./Icons"; //Component imported to display save,delete and edit icon

function DataTable(props){

    const columns=["Name","Email","Role","Actions"];

    /*This below method makes the row data fields editable on Clicking edit icon/button */   
    const editRowData = (id)=>{ 
  
        //Settting the selectedRow class styles to the selected table row
        let tr = document.getElementById(id);
        tr.className="EditRow";
        
        addIdtoSelectedRows(id);
        //Enabling the textfields for edit by updating the boolean value that saves its previous state
        let updatedData = props.data.map((dataItem)=>{
            if(dataItem.id===id){
                dataItem.isDisabled= !dataItem.isDisabled;
                dataItem.isChecked= true;
            }
            return dataItem;
        })
  
        props.updateData(updatedData);
    }
  
    //The below method makes the textfields uneditable on clicking save icon
    const saveRowData = (id)=>{
        
        //Removing the selectedRow class styles for specific row with specified id
        let tr = document.getElementById(id);
        tr.className="";

        removeIdFromSelectedRows(id);
  
        let updatedData = props.data.map((dataItem)=>{
            if(dataItem.id===id){
                dataItem.isDisabled= !dataItem.isDisabled;
                dataItem.isChecked= false;
            }
            return dataItem;
        })
  
        props.updateData(updatedData);
       
    }
  
    //The below method deletes the row data on clicking the delete icon
    const deleteRowData = (id)=>{
  
        let updatedData = props.data.filter((dataItem)=>{
            if(dataItem.id!==id){
                return dataItem;
            }
            return false;
        });
  
        props.updateData(updatedData);
    }

    const addIdtoSelectedRows = (id)=>{
        props.selectedRowsIds.push(id);
    }

    const removeIdFromSelectedRows = (id)=>{
        
       props.selectedRowsIds.splice(props.selectedRowsIds.indexOf(id),1);
       
    }

    //The below method allows you to update data in the textfields depending on which textfield you enter data into
    const handleChange = (e,id,val)=>{

        let tr = document.getElementById(id);
  
        if(tr.className!=="EditRow"){
            return;
        }
  
        let updatedData = props.data.map((dataItem)=>{
            if(dataItem.id===id){
                if(dataItem.name===val){
                    dataItem.name=e.target.value;       //If you click on name textfield, enable name textfield editing
                }
                else if(dataItem.email===val){
                    dataItem.email = e.target.value;    //If you click on email textfield, enable email textfield editing
                }
                else{
                    dataItem.role = e.target.value;     //If you click on role textfield, enable role textfield editing
                }
            }
            return dataItem;
        });
  
       // set the updated data array to state variable
        props.updateData(updatedData);
    }
  
    //The following method toggles the checkbox value and also adds respective styles based on checkbox being selected or unselected
    const handleCheckBox = (id,isChecked)=>{
       
        //If isChecked value is false, then set the row class in which the checkbox is present to selectedRow, which changes the styles
        if(isChecked===false){  
               let tr = document.getElementById(id);
               tr.className="SelectedRow";
               addIdtoSelectedRows(id);
         }
         else{  //If checkbox value is true , then remove the row class from selection by setting the row classname to empty string 
  
             let tr = document.getElementById(id);
             tr.className="";
             removeIdFromSelectedRows(id);
         }
         
         //Toggle the boolean value by changing the respective state variable
         let updatedData = props.data.map((dataItem)=>{
             if(dataItem.id===id){
                 dataItem.isChecked= !dataItem.isChecked;
             }
             return dataItem;
         })
  
        // set the updated data array to state variable
        props.updateData(updatedData);

        // console.log(props.selectedRowsIds);
  
    }

    const selectAllCheckBox=(e)=>{

        /*Emptying the array that holds Id of checkboxes that are checked*/
        props.updateSelectedRowsIds([]);

        if(e.target.checked===true){
            let updatedArray=[];
            props.currentData.forEach((dataItem)=>{
                
                updatedArray.push(dataItem.id);
                dataItem.isChecked=true;
                let tr = document.getElementById(dataItem.id);
                tr.className="SelectedRow";
            })    
            props.updateSelectedRowsIds(updatedArray);
            // console.log(updatedArray);
        } 
        else{

            props.currentData.forEach((dataItem)=>{
                dataItem.isChecked=false;
                let tr = document.getElementById(dataItem.id);
                tr.className="";
            });    
            
            props.updateSelectedRowsIds([]);
            // console.log(props.selectedRowsIds);
        }
        
        
    }

    return (
    <div className="Main">
        <div className="DataTable">
        {
            props.data.length>0?
            <table>
                <thead>
                    <tr>
                        <th><input id="checkbox" type="checkbox" onChange={(e)=>{selectAllCheckBox(e);}} /></th>
                        {columns.map((columnItem,index)=>(     
                            <th key={index}>{columnItem}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/*Maps the API response returned as an array of object and displays data*/}
                    {props.currentData.map((dataItem)=>(
                    <tr id={dataItem.id} key={dataItem.id} >
                        <td><input type="checkbox" checked={dataItem.isChecked} onChange={()=>{handleCheckBox(dataItem.id,dataItem.isChecked);}}/></td>
                        <td className="name"><input type="text" value={dataItem.name} onChange={(e)=>{handleChange(e,dataItem.id,dataItem.name);}} disabled={dataItem.isDisabled}/></td>
                        <td><input type="text" value={dataItem.email} onChange={(e)=>{handleChange(e,dataItem.id,dataItem.email);}} disabled={dataItem.isDisabled}/></td>
                        <td className="role"><input type="text" value={dataItem.role} onChange={(e)=>{handleChange(e,dataItem.id,dataItem.role);}} disabled={dataItem.isDisabled}/></td>
                        <td><Icons id={dataItem.id} isDisabled={dataItem.isDisabled} saveRowData={saveRowData} deleteRowData={deleteRowData} editRowData={editRowData} /></td> 
                    </tr>
                ))}
                    
                </tbody>
            </table>
            :
            <h1>No Records Left!</h1>
        }
           
        </div>    
    </div>
        
    );
}

export default DataTable;