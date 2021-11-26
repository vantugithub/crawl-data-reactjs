import FormSearchForIns from './FormSearchForIns';
import classes from './MealsSummary.module.css';

const MealsSummary = (props) => {
  return (
    <section className={classes.summary}>
      <h2>Instagram Smart Crawler</h2>
      <p>
      The system collects information about users who used 
      a given hashtag in the past week on the social network instagram.
      </p>
      <p>
      The extended feature of the system is that you can search for 
      hastags and calculate the number of hashtags related to your hashtag!
      </p>
      <FormSearchForIns onSearchHashTag = {props.onSearchHashTag} />
    </section>
  );
};

export default MealsSummary;