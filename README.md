# BananaSlider

## To init:

```html
<body>
  <!-- If you just want a simple init, put this at the bottom of your "body" tag  -->
  <script src="https://banana.kruceo.com/dist/bundle.cdn.js"></script>
  <script>
    initAllSliders();
  </script>
</body>
```

## Your first step:

```html
<slider>
  <slide>
    <h2>Your first slide!</h2>
  </slide>
  <slide>
    <h2>Your second slide!</h2>
  </slide>
  <slide>
    <h2>Your third slide!</h2>
  </slide>
</slider>
```

## Customize showtime:

```html
<slider cooldown="5000">
  <!-- 5 seconds -->
  <slide>
    <h2>5 seconds to change bro!</h2>
  </slide>
  <slide>
    <h2>More 5 seconds!</h2>
  </slide>
  <slide>
    <h2>Wait a little bit...</h2>
  </slide>
</slider>
```

To a stopped slide:

```html
<slider cooldown="0">
  <!-- it doesn't move, other than with "hover:'add'" attribute or js script commands -->
  <slide>
    <h2>I don't move any muscles</h2>
  </slide>
  <slide>
    <h2>More a eternity of seconds!</h2>
  </slide>
  <slide>
    <h2>wait a lot...</h2>
  </slide>
</slider>
```

To individual slide showtime set:

```html
<slider>
  <!-- if you don't set a cooldown to "slider" tag, the default is 1 second-->
  <slide cooldown="7000">
    <h2>I'm here for 7 seconds</h2>
  </slide>
  <slide cooldown="5000">
    <h2>I'm here for 5 seconds</h2>
  </slide>
  <slide cooldown="3000">
    <h2>I'm here for 3 seconds</h2>
  </slide>
</slider>
```

## Customize animation speed:

```html
<slider speed="250">
  <!-- 0.25 seconds -->
  <slide>
    <h2>I'll complete this transition in 250 millis</h2>
  </slide>
  <slide>
    <h2>Is this fast?</h2>
  </slide>
  <slide>
    <h2>You like?</h2>
  </slide>
</slider>
```

## Customize hover action:

```html
<slider hover="add">
  <!-- "add", "stop" or "none"... "stop" is default -->
  <slide>
    <h2>Put your mouse over me!</h2>
  </slide>
  <slide>
    <h2>BOOOOOOOO!</h2>
  </slide>
</slider>
```

## Customize animation:

```html
<slider animation="vertical">
  <!-- "vertical" and "horizontal"... "horizontal" is default -->
  <slide>
    <h2>I'll move to the right!</h2>
  </slide>
  <slide>
    <h2>All right?</h2>
  </slide>
  <slide>
    <h2>With you?</h2>
  </slide>
</slider>
```

## Customize initial slide:

```html
<slider initial="1">
  <!-- Show 2023 first" -->
  <slide>
    <h2>2022</h2>
  </slide>
  <slide>
    <h2>2023</h2>
  </slide>
  <slide>
    <h2>2024</h2>
  </slide>
</slider>
```

## How to control this with JS?

All sliders are initialized on window load and indexed on "banana" object with your id attribute name, and you can find your slider calling the object "banana"...
<br/>

###### PS: If you don't give a id to your slide is set the default name and you can reach it like any other, the name is set like "slider1", "slider2"...

##### Write your slider like you prefer and give a id attribute...

```html
<slider id="my-slider">
  <!-- the obj name is "my-slider" -->
  <slide> 1 </slide>
  <slide> 2 </slide>
  <slide> 3 </slide>
  <slide> 4 </slide>
</slider>
```

##### Now you can control it calling `banana['my-slider']`

```html
<button onClick="banana['my-slider'].move(1)">+</button>
<button onClick="banana['my-slider'].move(-1)">-</button>
```

### What is move?

move adds the parameter number to current slider index, try this:

```html
<button onClick="banana['my-slider'].move(1)">+1</button>
<button onClick="banana['my-slider'].move(-1)">-1</button>
<button onClick="banana['my-slider'].move(2)">+2</button>
<button onClick="banana['my-slider'].move(-2)">-2</button>
```

### What is tp?

tp is acronym to "teleport" and do exactly this, a example:

```html
<button onClick="banana['my-slider'].tp(0)">1</button>
<button onClick="banana['my-slider'].tp(1)">2</button>
<button onClick="banana['my-slider'].tp(2)">3</button>
<button onClick="banana['my-slider'].tp(3)">4</button>
```

## Using the show event:

The most basic use of the event is with the attribute "onShow":

```html
<slider initial="1">
  <slide>
    <h2>I don't print anything</h2>
  </slide>
  <slide onShow="console.log('BANANA')">
    <h2>I print 'BANANA'</h2>
  </slide>
  <slide>
    <h2>I don't print anything</h2>
  </slide>
</slider>
```

Now set a id to any slide, like this:

```html
<slide id='slide1'>
    <h2>Print anything</h2>
</slide>
```
In your javascript file or tag, use:

```javascript
document.querySelector("#slide1").addEventListener('show',(e)=>
{
    console.log('Anything');
})
```

## More

You can see more and in real time working examples in <a href='https://banana.kruceo.com'>banana.kruceo.com
