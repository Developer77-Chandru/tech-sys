


//  navbar start

window.addEventListener('scroll', function() {
  var scrollTop = window.pageYOffset;
  var element = document.querySelector('.sticky-top ');
  
  if (scrollTop > 250) {
    element.classList.add('sticky-nav', '.sticky-top');
    element.style.top = '0px';
  } else {
    element.classList.remove('sticky-nav');
    element.style.top = '-100px';
  }
});


// navbar end


// <!--Home Start--!>



var w = window.innerWidth,
    h = window.innerHeight,
    canvas = document.getElementById('test'),
    ctx = canvas.getContext('2d'),
    rate = 60,
    arc = 100,
    time,
    count,
    size = 7,
    speed = 20,
    parts = new Array,
    colors = ['red','#f57900','yellow','#ce5c00','#5c3566'];
var mouse = { x: 0, y: 0 };

canvas.setAttribute('width',w);
canvas.setAttribute('height',h);

function create() {
  time = 0;
  count = 0;

  for(var i = 0; i < arc; i++) {
    parts[i] = {
      x: Math.ceil(Math.random() * w),
      y: Math.ceil(Math.random() * h),
      toX: Math.random() * 5 - 1,
      toY: Math.random() * 2 - 1,
      c: colors[Math.floor(Math.random()*colors.length)],
      size: Math.random() * size
    }
  }
}

function particles() {
  ctx.clearRect(0,0,w,h);
   canvas.addEventListener('mousemove', MouseMove, false);
  for(var i = 0; i < arc; i++) {
    var li = parts[i];
    var distanceFactor = DistanceBetween( mouse, parts[i] );
    var distanceFactor = Math.max( Math.min( 15 - ( distanceFactor / 10 ), 10 ), 1 );
    ctx.beginPath();
    ctx.arc(li.x,li.y,li.size*distanceFactor,0,Math.PI*2,false);
    ctx.fillStyle = li.c;
    ctx.strokeStyle=li.c;
    if(i%2==0)
      ctx.stroke();
    else
      ctx.fill();
    
    li.x = li.x + li.toX * (time * 0.05);
    li.y = li.y + li.toY * (time * 0.05);
    
    if(li.x > w){
       li.x = 0; 
    }
    if(li.y > h) {
       li.y = 0; 
    }
    if(li.x < 0) {
       li.x = w; 
    }
    if(li.y < 0) {
       li.y = h; 
    }
     
  }
  if(time < speed) {
    time++;
  }
  setTimeout(particles,1000/rate);
}
function MouseMove(e) {
   mouse.x = e.layerX;
   mouse.y = e.layerY;

   //context.fillRect(e.layerX, e.layerY, 5, 5);
   //Draw( e.layerX, e.layerY );
}
function DistanceBetween(p1,p2) {
   var dx = p2.x-p1.x;
   var dy = p2.y-p1.y;
   return Math.sqrt(dx*dx + dy*dy);
}
create();
particles();

// <!--Home end--!>

// <!--- portfolio page start --!>

var activeFilter = 'all';

$('.pp-filter-button').on('click', function(e) {
  // remove btn-primary from all buttons first
  $('.pp-filter-button').removeClass('btn-primary');
  $('.pp-filter-button').addClass('btn-outline-primary');

  // add btn-primary to active button
  var button = $(this);
  button.removeClass('btn-outline-primary');
  button.addClass('btn-primary');
  filterItems(button.data("filter"));
  e.preventDefault();
})

function filterItems(filter) {
  if(filter === activeFilter) {
    return;
  }

  activeFilter = filter;
  $('.pp-gallery .card').each(function () {
    var card = $(this);
    var groups = card.data("groups");
    var show = false;
    if(filter === 'all') {
      show = true;
    }
    else {
      for(var i = 0; i < groups.length; i ++) {
        if(groups[i] === filter) {
          show = true;
        }
      }
    }
    // hide everything first
    card.fadeOut(400);

    setTimeout(function() {
      if(show && !card.is(":visible")) {
          card.fadeIn(400)
        }
      }, 500);
  });
}

// <!--- portfolio page end --!>




var camera, controls, scene, renderer;

var mouseX = 0, mouseY = 0;


scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0x062131, 0.002 );

renderer = new THREE.WebGLRenderer();
renderer.setClearColor( scene.fog.color );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

var container = document.getElementById( 'container' );
container.appendChild( renderer.domElement );

camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 3000 );
camera.position.z = 600;

// controls = new THREE.OrbitControls( camera, renderer.domElement );
// //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;

// world
var geometry = new THREE.CylinderGeometry( 0, 10, 15, 3, 1 );

var materials = [
	new THREE.MeshLambertMaterial( { color: 0x293732 } ),
	new THREE.MeshLambertMaterial( { color: 0x0A3349 } ),
	new THREE.MeshLambertMaterial( { color: 0x1B2941 } ),
];

var tris = [];

var pivot = new THREE.Object3D();

pivot.position = scene.position;

for ( var i = 0; i < 500; i ++ ) {

	tris[i] = new THREE.Mesh( geometry, materials[getRandom(0, 2)] );
	tris[i].position.x = ( Math.random() - 0.5 ) * 1000;
	tris[i].position.y = ( Math.random() - 0.5 ) * 1000;
	tris[i].position.z = ( Math.random() - 0.5 ) * 1000;
	tris[i].rotation.x = ( Math.random() - 0.5 ) * 1000;
	tris[i].rotation.y = ( Math.random() - 0.5 ) * 1000;

	tris[i].o_pos_x = tris[i].position.x;
	tris[i].o_pos_y = tris[i].position.y;

	pivot.add( tris[i] );

}

scene.add(pivot);


// Main

var size = 200;
var point;

var outerGeo = new THREE.CylinderGeometry( size, size, 20, 3, 20 );
var innerGeo = new THREE.CylinderGeometry( size - 5, size - 5, 20, 3, 20 );

var outerBSP = new ThreeBSP(outerGeo);
var innerBSP = new ThreeBSP(innerGeo);

var intersections = outerBSP.subtract(innerBSP);  

var mainMat = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors } );
var faceIndices = [ 'a', 'b', 'c' ];

var mainGeo = intersections.toGeometry();

for ( var i = 0; i < mainGeo.faces.length; i++ ) {
	var face = mainGeo.faces[ i ];
	var numberOfSides = 3;
	// assign color to each vertex of current face
	for( var j = 0; j < numberOfSides; j++ ) {

		vertexIndex = face[ faceIndices[ j ] ];

		// store coordinates of vertex
		point = mainGeo.vertices[ vertexIndex ];

		// initialize color variable
		color = new THREE.Color( 0xffffff );
		color.setRGB( 0.5 + point.x / size, 0.5 + point.y / size, 0.5 + point.z / size );
		face.vertexColors[ j ] = color;

	}
}

var mainTri = new THREE.Mesh( mainGeo, mainMat );
mainTri.rotateX((Math.PI * 3) / 2);
mainTri.position.set( 0, 0, 0 );
scene.add(mainTri);

var subTri = new THREE.Mesh( mainGeo, mainMat );
subTri.rotateX(Math.PI  / 2).scale.set(0.49, 0.49, 0.49);
subTri.rotateZ((Math.PI * 6) / 2);
subTri.position.set( 0, 0, 0 );
scene.add(subTri);




// lights
var ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambientLight );

var lights = [];
lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

lights[ 0 ].position.set( 0, 200, 0 );
lights[ 1 ].position.set( 100, 200, 100 );
lights[ 2 ].position.set( - 100, - 200, - 100 );

scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );

//


//

window.addEventListener( 'resize', onWindowResize, false );


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {
	mouseX = event.clientX - window.innerWidth / 2;
	mouseY = event.clientY - window.innerHeight / 2;
}

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

var tween;

function onClick( event ) {
	TWEEN.removeAll();
    tween = new TWEEN.Tween( { x:camera.position.x, y:camera.position.y, z:camera.position.z } )
    .to( { x: camera.position.x + 10, y: camera.position.y + 10, z: camera.position.z + 10 }, 2000 )
    .onUpdate( function () {
		camera.position.set(this.x);
		camera.lookAt(scene.position);
	} )
    .start();   
}

// document.addEventListener( 'click', onClick, false );

var cameraAngle = 0;
var orbitRange = 800;
var orbitSpeed = 0.02;
var desiredAngle = (Math.PI * 6) / 2;

var inc = 0.06;
var rev_inc = false;

camera.position.set(orbitRange, 100, 500);
camera.lookAt(mainTri.position);




animate();


function animate() {
    var time = Date.now() * 0.00005;

    if (inc >= 1) {
    	rev_inc = true;
    }

    if (rev_inc) {
    	inc -= 0.005;
    } else {
		inc += 0.005;
    }

    if (inc <= 0.06) {
    	rev_inc = false;
    }

	requestAnimationFrame( animate );

	// controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

	TWEEN.update();

	camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
	camera.lookAt(scene.position);

	for ( var i = 0; i < mainTri.geometry.faces.length; i++ ) {
		
		var face = mainTri.geometry.faces[ i ];
		var numberOfSides = 3;

		// assign color to each vertex of current face
		for( var j = 0; j < numberOfSides; j++ ) {

			vertexIndex = face[ faceIndices[ j ] ];

			// store coordinates of vertex
			point = mainTri.geometry.vertices[ vertexIndex ];
			face.vertexColors[ j ].setHSL( inc + point.x / size, 0.6, 0.5 );


		}
	}

	mainTri.geometry.colorsNeedUpdate = true;


	pivot.rotation.y += 0.001;
	pivot.rotation.x += 0.001;

	render();

}

function render() {

	renderer.render( scene, camera );

}



function getRandom(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}











