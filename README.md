
# Theme Park - Advocates

> Nashville Software School, Full-Stack Dev Bootcamp, Front-End Group Project.
> 
> For this project groups were assigned by Myers Briggs personality types. As a team, create a interactive map of a theme park to include different areas with attractions and events.
> 
> 
> **Primary Learning Objective:** Become more proficient in working with Firebase, i.e. Promises, deployment, etc..
> 
> *Disclaimer: The style and functional requirements of this project were provided by a "Product Manager". UX was not a learning objective for this project.*

### Requirements

**Technical Considerations:**
>Data is required to be requested from Firebase based on collections. Pull only what is needed.
>Consider encapsulating all Firebase calls into a single module.

>Use SASS to control color themes.
>Incorporate Bootstrap for your CSS grid framework and nav bar components.

**Technology Requirements:**

- SASS
- JQuery
- Grunt (with JSHINT)
- Promises
- Browserify
- Bootstrap Grid Framework
- Firebase for data storage and retrieval

**Park Map:**

On load the Park Map should display each area's name and description.

**Search Field:**

On Enter the areas that contain an attraction, whose name contains the search string, should be outlined with a border.

If the attraction description contains any 'keywords', then the attraction (if displayed in the list container) background should be a hazy blue and the area that attraction belongs to should have an image background.

**List Container:**

On load all events occuring in the current hour should appear in the list container with their correlating area in parenthasis.

When a time is selected from the drop down menu, all events occuring in that hour should appear in the list container with their correlating area in parenthasis.

On the Park Map when the user clicks on an area, all attractions within that area should appear in the list container with their correlating attraction type in parenthasis.

All attractions should appear as links. When clicked,  the description of the attraction, and/or its hours of operation should be displayed directly beneath the hyperlink, and before the next one.

	
### Deployed through Firebase
>[https://theme-park-advocates.firebaseapp.com/](https://theme-park-advocates.firebaseapp.com/)


### Contributors:

- [Adam Smith](https://github.com/hagansmith)
- [Kelly Stoops](https://github.com/kstoops815)
- [Jessica Brawner](https://github.com/lady-ace)
- [John Achor](https://github.com/johnachor)
