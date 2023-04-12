
import "./DataTable.css";
import Icons from "./Icons"; //Component imported to display save,delete and edit icon

function DataTable(props){

    const columns=["Name","Email","Role","Actions"];
   

    /*This below method makes the row data fields editable on Clicking edit icon/button */   
    const editRowData = (id)=>{ 
        
        addIdtoSelectedRows(id);
        //Enabling the textfields for edit by updating the boolean value that saves its previous state
        let updatedData = props.data.map((dataItem)=>{
            if(dataItem.id===id){
                dataItem.isDisabled= !dataItem.isDisabled;
                dataItem.isChecked= dataItem.isChecked?true:false;
            }
            return dataItem;
        })
  
        props.updateData(updatedData);
    }
  
    //The below method makes the textfields uneditable on clicking save icon
    const saveRowData = (id)=>{

        removeIdFromSelectedRows(id);
  
        let updatedData = props.data.map((dataItem)=>{
            if(dataItem.id===id){
                dataItem.isDisabled= !dataItem.isDisabled;
                dataItem.isChecked= dataItem.isChecked?true:false;
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
    
    
    //Adds the id to arary that contains the ids of those dataItems whose checkbox is checked
    const addIdtoSelectedRows = (id)=>{
        props.selectedRowsIds.push(id);
        console.log(props.selectedRowsIds);
    }

    //Removes the id from arary that contains the ids of those dataItems whose checkbox is checked
    const removeIdFromSelectedRows = (id)=>{
        
       props.selectedRowsIds.splice(props.selectedRowsIds.indexOf(id),1);
       
    }

    //The below method allows you to update data in the textfields depending on which textfield you enter data into
    const handleChange = (e,id,val)=>{
  
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
  
    //The following method toggles the checkbox value by updating the field that represents its checked value
    const handleCheckBox = (id,isChecked)=>{
       
        if(isChecked===false){  
            
               addIdtoSelectedRows(id);
         }
         else{  

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
  
    }

    const selectAllCheckBox=(e)=>{

        /*Emptying the array that holds Id of checkboxes that are checked*/
        props.updateSelectedRowsIds([]);

        //Checks the current page checkboxes of all dataItems and adding ids of dataItems to be delted in a seperate array 
        if(e.target.checked===true){
            let updatedArray=[];
            props.currentData.forEach((dataItem)=>{
                
                updatedArray.push(dataItem.id);
                dataItem.isChecked=true;
            })    
            props.updateSelectedRowsIds(updatedArray);
            
        } 
        else{
            //Unchecks the current page checkboxes of all dataItems and emptysthe array that holds the ids to be deleted 
            props.currentData.forEach((dataItem)=>{
                dataItem.isChecked=false;
            });    
            
            props.updateSelectedRowsIds([]);
        }
        
        
    }

    const getClassName=(isChecked,isDisabled)=>{
        if(isChecked&&isDisabled===false){
            return "SelectedRow EditRow"
        }
        else if(isChecked){
            return "SelectedRow"
        }
        else if(isDisabled===false){
            return "EditRow";
        }
        else{
            return "";
        }
    }

    return (
        <div className="DataTable">
        {
            props.data.length>0?
            <table>
                <thead>
                    <tr>
                        <th className="checkboxClass" ><input id="checkbox" type="checkbox" onChange={(e)=>{selectAllCheckBox(e);}} /></th>
                        {columns.map((columnItem,index)=>(     
                            <th key={index}>{columnItem}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/*Maps the API response returned as an array of object and displays data*/}
                    {props.currentData.map((dataItem)=>(
                        <tr id={dataItem.id} 
                        key={dataItem.id} 
                        className={getClassName(dataItem.isChecked,dataItem.isDisabled)}
                    >
                        <td className="checkboxClass" ><input type="checkbox" checked={dataItem.isChecked} onChange={()=>{handleCheckBox(dataItem.id,dataItem.isChecked);}}/></td>
                        <td className="name">{dataItem.isDisabled?dataItem.name: <input type="text" value={dataItem.name} onChange={(e)=>{handleChange(e,dataItem.id,dataItem.name);}} disabled={dataItem.isDisabled}/>}</td>
                        <td className="email">{dataItem.isDisabled?dataItem.email:<input type="text" value={dataItem.email} onChange={(e)=>{handleChange(e,dataItem.id,dataItem.email);}} disabled={dataItem.isDisabled}/>}</td>
                        <td className="role">{dataItem.isDisabled?dataItem.role:<input type="text" value={dataItem.role} onChange={(e)=>{handleChange(e,dataItem.id,dataItem.role);}} disabled={dataItem.isDisabled}/>}</td>
                        <td><Icons id={dataItem.id} isDisabled={dataItem.isDisabled} saveRowData={saveRowData} deleteRowData={deleteRowData} editRowData={editRowData} /></td> 
                    </tr>
                ))}
                    
                </tbody>
            </table>
            :
            <h1>No Records Left!</h1>
        }
           
        </div>
        
    );
}

export default DataTable;