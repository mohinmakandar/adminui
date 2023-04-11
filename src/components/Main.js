import DataTable from './DataTable';
import {useState, useEffect} from "react";
import axios from "axios";
import BelowTableSection from "./BelowTableSection";
import Search from './Search';
  
function Main() {
  const [data, setData] = useState([]);  //State variable created to keep track of Table data
  const [currentPage, setCurrentPage] = useState(1);    //Setting the currentpage value to 1
  const [selectedRowsIds,setSelectedRowsIds] = useState([]);

  const dataItemsPerPage=10; //Records each page
  
  const fetchData = async ()=>{   /* Function makes an API call for the data and sets it to state variable*/

      const res = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      const data = await res.data;

      let updatedData = data.map((dataItem)=>{  //Adding two more key-value pairs to maintain state of textField and Checkbox
          dataItem.isDisabled=true;
          dataItem.isChecked=false;
          dataItem.show=true;
          return dataItem;
      })
     
      setData(updatedData); //Setting the updated data object to state variable
  }

  //Calls fetchData method on mount
  useEffect(()=>{ 
      fetchData();   
  },[]);

  //Method to update the state object from another component
  const updateData=(updatedData)=>{
    setData(updatedData);
  }

  //Updates the array with all the ids of Data Items whose checkboxes are checked
  const updateSelectedRowsIds=(array)=>{
    setSelectedRowsIds(array);
    console.log(selectedRowsIds);
  }

  //deleting multiple selected rows 
  const deleteMultipleRows=()=>{

    let filteredArray = data.filter((dataItem)=>{
      if(dataItem.isDisabled===false){
        return dataItem;
      }
      return false;
    });

    //If any editable field is enabled then don't perform delete operation and show an alert
    if(filteredArray.length>0){
      alert('Save the Data Items First!');
      return;
    }

    //If No Data Items are selected then show an alert and don't perform delete operation
    if(selectedRowsIds.length===0){
      alert('No Data Items Selected!');
      return;
    }

    //Perform deletion and update the state variable
    let updatedData = data.filter((dataItem)=>{

        if(!selectedRowsIds.includes(dataItem.id)){
          return dataItem;
        }
        else{
          selectedRowsIds.splice(selectedRowsIds.indexOf(dataItem.id),1);
          return false;
        }
    });
    
    setData(updatedData);
    updateSelectedRowsIds([]);

  }

  //Set up the 10 records to display on the current page
  const updateCurrentData  = ()=>{
    
    const filteredData = data.filter((item)=> {return item.show===true});
    const indexofLastDataItem = currentPage*dataItemsPerPage;
    const indexofFirstDataItem = indexofLastDataItem-dataItemsPerPage;
    const currentDataItems = filteredData.slice(indexofFirstDataItem,indexofLastDataItem);

    return currentDataItems;
  }
  
  //Set the page to currentpage whenever this method is invoked
  const setThisPage=(page)=>{
    console.log("currentpage: "+page);
    setCurrentPage(page);
  }


  let currentData = updateCurrentData();

  return (
    <div className="App">
      <h1 className='heading'>ADMIN UI</h1>
      <Search data={data} updateData={updateData} />
      <DataTable 
        updateData={updateData} 
        data = {data} 
        currentData={currentData} 
        selectedRowsIds={selectedRowsIds} 
        updateSelectedRowsIds={updateSelectedRowsIds}
      />
      <BelowTableSection 
        data={data} 
        deleteMultipleRows={deleteMultipleRows}
        dataItemsPerPage={dataItemsPerPage} 
        setThisPage={setThisPage}
      />
    </div>
  );

}

export default Main;