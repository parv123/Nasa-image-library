import React, { useState} from "react";
//import logo from './logo.svg';
//import loader from './loader.gif'
import './App.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import loader from './loader.png'
//import Sample from './Sample';
//import Carousel from 'react-bootstrap/Carousel'
/*var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

*/
function Course({ course, index, upvoteCourse, downvoteCourse }) {
  return (
    <div style={ {padding: '10px'}} >
      <Card style={{maxWidth: '500px', marginBottom: '10px'}} direction="column" justify="center"
  alignItems="center">
       { course.hasOwnProperty('links')===true ? <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                    image={ course.links[0].href }
                    title={course.data[0].title}
                    />:<CardMedia style={{height: 0, paddingTop: '56.25%'}}
                    image={ loader }
                    title={course.data[0].title}
                    />}
        <CardContent>
          <Typography variant="headline" component="h5" style={{textAlign: 'left', paddingBottom: '7px'}}>{course.data[0].title}</Typography>
          <Typography component="p" color="textSecondary" style={{textAlign: 'justify', paddingBottom: '7px'}}>< span dangerouslySetInnerHTML={{__html: course.data[0].description}} ></span></Typography>
          <br />
          <Typography color="textSecondary"  style={{textAlign: 'left', paddingBottom: '7px', fontWeight :'bolder'}}>{ course.upvote_count }
          &nbsp;
          <Icon color="primary" onClick={() => upvoteCourse(index)}>
            thumb_up_alt
          </Icon>
          
          &nbsp;&nbsp;
          <span>{ course.downvote_count }</span>
          &nbsp;
          <Icon color="error" onClick={() => downvoteCourse(index)}>
            thumb_down_alt
          </Icon>
          </Typography>
        </CardContent>
        
      </Card>
    </div>
  )
}
function App() {
  const [key, setKey] = useState("");
  const [data, setData] = useState([]);
  const[flag, setFlag] = useState(false);
  const [disable, setDisable]= useState(false);
  
 function resetDetails(e){
	 setKey("");
	 setDisable(false);
	 setData([]);
 }

  function submitDetails(e){
	
    if(key==="")
    {
      alert("Please fill all the details.")
    }
    else{
		setData([]);
		setDisable(false);
    setFlag(true);
    var queryURL = `http://localhost:3000/${key}`
    
    //https://nasa-image-server.herokuapp.com/${key}
    // make AJAX request using fetch API
    fetch(queryURL)
    .then(res => res.json())
      
    .then((out) => {
       let arr = [];
      var x = out.collection.items;
      let len = x.length;
      if(len>15)
      len = 15;
      for(let i=0; i<len ;i++){
        Object.defineProperty(x[i],'idvalue',{
          value:i+1,
          writable:false
        })
        Object.defineProperty(x[i],'upvote_count',{
          value:0,
          writable:true
        })
        Object.defineProperty(x[i],'downvote_count',{
          value:0,
          writable:true
        })
        arr[i]=x[i];
      }
     
      
    console.log(arr);
      setData(arr);
   
setFlag(false);
setDisable(true);
     
      
  })
        
  .catch(function (error) {
            console.log(error);
        });
       // console.log(queryURL);
    }
       e.preventDefault();
      
    
  }
  
  const upvoteCourse = index => {
    const newCourse = [...data];
    newCourse[index].upvote_count++;
    setData(newCourse);
  };

  const downvoteCourse = index => {
    const newCourse = [...data];
    newCourse[index].downvote_count++;
    setData(newCourse);
  };
function renderItems(){
  const mapRows = data.map((item , index)=>(

<Grid item xs={12} sm={6} lg={4} xl={3}  >
   <Course key ={index}
   index={index}
   course ={item}
   upvoteCourse={upvoteCourse}
   downvoteCourse={downvoteCourse}
   />
   
  
  
  
  </Grid>





  
  ));
  
  
  return (  mapRows);
}


  function handleChange(e) {
    setKey(e.target.value);
  }
  
  
  return (
   
    <div className="App">
       
       {disable=== false ? <h6 id="line">Enter the keywords to search through Nasa's image library. </h6>:<span></span>}
      <form>
        <input placeholder="Enter the keywords here. e.g. MARS." className="textbox m-2" onChange={handleChange}  id = "loc" value={key}/>  
         <button className="searchbtn"  onClick={submitDetails} btype = "submit" ><i className="srch fa fa-search"></i></button>
       {disable=== true? <button className="searchbtn" onClick={resetDetails} btype = "submit" >Reset</button>:<span></span>}
        </form>
        {flag === true ? <center><img className="loader"  src={loader}></img></center>:<span></span>}
       <br></br>
  
       
       
      <div>
        {data.length==0 && disable == true ? <span id= "noresult">NOTHING FOUND</span> :
        <Grid container spacing ={24} style = {{padding:24,position:'absolute'}}>
       {renderItems()}
       </Grid>}
       </div>
       
     
       
      </div>
  );
}

export default App;
