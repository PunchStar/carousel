import React, { useState, useEffect  } from "react";
import styled from "styled-components"
import * as actions from './../actions';
const useSortableData = (items:any, config:any = null) => {
    const [sortConfig, setSortConfig] = useState(config);
    
    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key:any) => {
      let direction = 'ascending';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    }
    return { items: sortedItems, requestSort };
  }
export default function Carousel() {
  const [flag, setFlag] = useState(false);
  const { items, requestSort } = useSortableData(actions.getTableData());
  const [position, setPosition] = useState(0);
    // const changeSlide = (position:number):number =>{
    //     if(position > data.length - 1)
    //         return 0;
    //     return changeSlide(position + 1);
    // }
    useEffect (() => {
        let caroselInterval = setInterval(() => {
            setPosition((position) =>{
                if( position  >= items.length - 1)
                    return 0;
                return position + 1;
            })      
        }, 4000)
        return () => {
            clearInterval(caroselInterval);
        }
    },[])
  return (
        <>
            <CarouselWrapper>
                <button onClick={()=>setPosition(position < 1 ? items.length -1  : position - 1)}> Prev </button>
                <img src={items[position].url} alt={items[position].name}/>
                <button onClick={()=>setPosition(position > items.length - 2 ? 0  : position + 1)}>  Next </button>
            </CarouselWrapper>
            <TableWrapper>
                <tr>
                    <th onClick={() => requestSort('name')}> Name </th>
                    <th onClick={() => requestSort('url')}> URL </th>
                    <th > Img </th>
                </tr>
                {items.map((image, index) =>{
                    return (<tr>
                        <td>{image.name}</td>
                        <td>{image.url}</td>
                        <td><img src={image.url} alt={image.name}/></td>
                    </tr>)
                })}
            </TableWrapper>
        </>
  )
}
const CarouselWrapper = styled.div`
    display:flex;
    max-width: 900px;
    height: 50vh;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    img {
      display:block;
    }
`
const TableWrapper = styled.table`
    margin-top: 50px;
    width: 100%;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        cursor:pointer
    }
    tr:nth-child(even) {
        background-color: #dddddd;
    }
    td img {
        width: 100%;
    }
`