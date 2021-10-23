import {isEmpty} from 'lodash'


class SearchAndFilter {
  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits, interestArea) {

    let coursesArray = Object.values(courses)

    const subjectFilter = (item) => subject === "All" ? true : item.subject === subject;

    const creditsFilter = (item) => isEmpty(minimumCredits) && isEmpty(maximumCredits) ? true :
    isEmpty(minimumCredits) ? item.credits <= maximumCredits.trim() :
    isEmpty(maximumCredits) ? item.credits >= minimumCredits.trim() : 
    item.credits >= minimumCredits.trim() && item.credits <= maximumCredits.trim();

    const searchFilter = (item) => isEmpty(search.toLowerCase().trim()) ? true : item.keywords.some((element) => element.includes(search.toLowerCase().trim()));

    const interestAreaFilter = (item) => interestArea === "All" ? true : item.keywords.some((element) => element.includes(interestArea));

    const combinedFilter = (item) => creditsFilter(item) && subjectFilter(item) && searchFilter(item) && interestAreaFilter(item); 

    var combinedArray = coursesArray.filter(combinedFilter);
    return combinedArray;

  }
}

export default SearchAndFilter;
