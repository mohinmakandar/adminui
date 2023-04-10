import './App.css';
import DataTable from './components/DataTable';
import {useState, useEffect} from "react";
import axios from "axios";
import BelowTableSection from "./components/BelowTableSection";
import Search from './components/Search';
  
function App() {
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

  useEffect(()=>{ //Calls fetchData method on mount
      fetchData();   
  },[]);


  const updateData=(updatedData)=>{
    setData(updatedData);
  }

  const updateSelectedRowsIds=(array)=>{
    setSelectedRowsIds(array);
    console.log(selectedRowsIds);
  }

  const deleteMultipleRows=()=>{

    if(selectedRowsIds.length===0){
      return;
    }

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

    //Unchecking the first row checkbox
    let checkbox = document.getElementById("checkbox");
    checkbox.checked=false;

  }

  const updateCurrentData  = ()=>{
    
    const filteredData = data.filter((item)=> {return item.show===true});
    const indexofLastDataItem = currentPage*dataItemsPerPage;
    const indexofFirstDataItem = indexofLastDataItem-dataItemsPerPage;
    const currentDataItems = filteredData.slice(indexofFirstDataItem,indexofLastDataItem);

    return currentDataItems;
  }
  
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
        selectedRowsIds={selectedRowsIds} 
        setThisPage={setThisPage}
      />
    </div>
  );

}

export default App;
