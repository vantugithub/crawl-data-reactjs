import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import axios from '../../../../router/react-app/node_modules/axios';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const AvailableMeals = (props) => {

  const [posts,setPosts]  = useState([]);
  const [pageCount,setPageCount] = useState(0);
  const [isSearchHashTagOfUser,setIsSearchHashTagOfUser] = useState(false);
  const [storeSearchText,setSearchText] = useState('');

  const handlePageClick = (data) => {
    if (isSearchHashTagOfUser) {
      axios.get(`https://instagram-smart-crawler.herokuapp.com/api/posts/search?key=${storeSearchText}&page=${data.selected}&size=15`).then(
      (response) => response.data
    ).then((data) => {setPosts(data.content);
                      setPageCount(data.totalPages)
    });
    console.log("search");
    }
    else{
      axios.get(`https://instagram-smart-crawler.herokuapp.com/api/posts?page=${data.selected}&size=15`).then(
        (response) => response.data
      ).then((data) => {setPosts(data.content);
                        setPageCount(data.totalPages)
      });
      console.log("no search")
    }
    console.log("handler click") 
  }

  useEffect( () => {
    axios.get(`https://instagram-smart-crawler.herokuapp.com/api/posts?page=0&size=15`).then(
      (response) => response.data
    ).then((data) => {
                      setPosts(data.content);
                      setPageCount(data.totalPages)
    });
    console.log("affect");
  },[])

  const searchHander = (event) => {
    event.preventDefault();
    let searchText  = event.target.searchText.value;
    setSearchText(searchText);
    setIsSearchHashTagOfUser(true);
    axios.get(`https://instagram-smart-crawler.herokuapp.com/api/posts/search?key=${searchText}&page=0&size=15`).then(
      (response) => response.data
    ).then((data) => {
                      setPosts(data.content);
                      setPageCount(data.totalPages)
    });
  }

  


    const mealsList = posts.map( meal => <MealItem 
        id={meal.idUser}
        key={meal.id}
        codeCaption ={meal.codeCaption} 
        caption={meal.caption} 
        username ={JSON.parse(meal.username).user}></MealItem>)
    return <section className = {classes.meals}>
      
        <form  onSubmit={searchHander}>
        <input name="searchText"
          type="text" className="form-control-plaintext"  placeholder="Search for users related to hashtag" />
        </form>
        <br/>
        <Card>
        {posts.length && (<div><ul>
            {mealsList}
        </ul>
        <ReactPaginate
        previousLabel ={'previous'}
        nextLabel = {'next'}
        breakLabel = {'...'}
        pageCount ={pageCount}
        marginPagesDisplayed = {3}
        pageRangeDisplayed = {6}
        onPageChange = {handlePageClick}
        containerClassName = {'pagination justify-content-center'}
        pageClassName = {'page-item'}
        pageLinkClassName = {'page-link'}
        previousClassName = {'page-item'}
        previousLinkClassName = {'page-link'}
        nextClassName = {'page-item'}
        nextLinkClassName = {'page-link'}
        activeClassName= {'active'}
        >
        </ReactPaginate> </div>)}
        
        </Card>
       
    </section>
}

export default AvailableMeals;