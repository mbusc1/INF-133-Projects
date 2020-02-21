--Readme document for *author(s)*, *email(s)*, *UCI id(s)*--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 2/2 Following good principles of mobile design
- 2/2 Creating a compelling app
- 1/1 A readme which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
15 hours


3. What online resources did you consult when completing this assignment? (list specific URLs)
To display the information in a chart I used this chart.js tutorial:
https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/
and
https://www.chartjs.org/docs/latest/charts/line.html


To fetch today's date:
https://forum.ionicframework.com/t/show-todays-date-on-ionic/131183

For everything else
https://ionicframework.com/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/



4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
I did not consult any classmates or individuals.


5. Is there anything special we need to know in order to run your code?
Nope works well in lab or the ionic devapp



--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
I designed the app for a User which wishes to track their weekly progress improving their sleep. That is why I chose to go with a weekly graph.

7. Did you design your app specifically for iOS or Android, or both?
I focused on Android since it is the device I have to test with, but the app remains withing guidelines for IOS and Android.


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
A user can track overnight sleep by entering date and time with a spinner. I chose to use the datetime spinner because it automatically creates date objects and is easy to use on mobile.



9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
A user can track their sleepiness by entering a number with a number picker, multiple times, averaging each time per day. I chose this way in order to prevent user error, by constricting input to just numbers, and to allow multiple entries.


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
A user can visually see this weeks data on the charts which are visible on the main screen. I chose to use graphs because they are easy to read and visualize progress.


11. Which feature choose--using a native device resource, backing up logged data, or both?
I chose to implement backing up data locally using ionic storage


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
N/A


13. If you backed up logged data, where does it back up to?
Local storage using ionic storage


14. Did you add any "extra" features, such as other data to log, the ability to edit or delete data, or changes to the styling of the app? If so, what did you add? How do these add to the experience of the app?
I added a reset button, to give users an 'uh-oh' button, if the current day they are editing gets messed up. This helps prevent user error.
I gave the app a medium darkness theme to be easier on sleepy eyes. This makes the app more comfortable and approachable.
Since local storage is used, any night's data can be edited retroactively. This allows users to more accurately log their info and prevent error. Also users can enter multiple sleepiness scores per day.

