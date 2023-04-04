import ExampleDataTable from "../../components/datatable/ExampleDataTable";
import { useEffect, useState } from "react";

export default function Datatable(){

    const [data, setData] = useState('')

    useEffect(()=>{const fetchData = async () => {
        const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10eHFmanZrd3JhdHZzbmRyc3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1NDk3MTMsImV4cCI6MTk5NjEyNTcxM30.Uub6YPIH99Mr-9D2X0_XkOHxyilTaE-yRHVdGUnHoy8'
        const response = await fetch('https://mtxqfjvkwratvsndrszx.supabase.co/rest/v1/sign-up-emails', {headers: {'apikey': key}});

        const json = await response.json();
        console.log(json)
        setData(json);
      };
  
      fetchData();
    }, []);

    return(<div>{data[0]?.email}</div>)


}