Steps to run on local:
1. npm install
2. bower install 
3. grunt server

Description:
1. I have created single page web application which uses Twitch's search API.
2. For pagination purpose I am sending offset and limit in the URL which fetches 10 records at a time.
3. Responsive UI support is provided for ipad pro (1024 by 1366).

Known issues:
1. For pagination purpose I am requesting server with new offset and limit value. However every time response
gives different number of totals. Hence there will be change in total and number of pages every time request
is made by using next page button.
2. Description was not available in the response body hence I am showing "stream-name", "viewers" ,"logo" & "language" parameters.
