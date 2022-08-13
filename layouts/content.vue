<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
  </link>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-xs-1 col-md-2"></div>
        <div class="col-xs-10 col-md-8">
          {{ content }}
        </div>
        <div class="col-xs-1 col-md-2"></div>
      </div>
      <div class="row">
        <div class="col-xs-1 col-md-2"></div>
        <div class="col-xs-3 col-md-3">
          <a href="../">Return to Index</a>
        </div>
        <div class="col-xs-2 col-xs-offset-2 col-md-offset-2 col-md-3 text-right">
          <a href="{{site.github.repository_url}}/blob/gh-pages/{{page.path}}">Edit this page</a>
        </div>
        <div class="col-xs-1 col-md-2"></div>
      </div>
    </div>
  </body>
</html>