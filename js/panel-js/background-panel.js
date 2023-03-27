function hplane() {
  
	var planeGeo  = new THREE.PlaneGeometry(20,20, 4, 4);
	var wireframe = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true} );
	var planemat = new THREE.MeshBasicMaterial( { color: 0x801a33, transparent:true, opacity:1.0} );
	
	this.clr = [0.5, 0.1, 0.2, 0.8];
	this.alpha = this.clr[3];
	  this.speed = 4;
	  this.frozen = false;
	  this.captured = false;
	
	this.mesh = new THREE.Mesh(planeGeo, wireframe);
	this.randomize();
	
	  
  }
  hplane.prototype = {
	
	animate:function(seconds) {
		
	   if(this.mesh.material.opacity < this.clr[3]) {
			  //var dist = (this.mesh.position.z - -100.0)/40.0;
			  var dist = 1.0 - (this.mesh.position.z/-800);
			  if(dist > 1.0) { dist = 1.0; }
		  //console.log(dist);
			  this.mesh.material.opacity = this.clr[3]*dist;
		  }
		  this.mesh.position.z += this.speed * seconds;
	  
			if(this.mesh.position.z > ( 300 )) {
				this.randomize();
			}
	},
	
	randomize:function() {
	  this.mesh.position.x = (Math.random() * 620) -  310;
		this.mesh.position.y = (Math.random() * 129) - 64;
		this.mesh.position.z = (Math.random() * 800) * -1 - 100; 
		this.mesh.rotation = new THREE.Vector3(80, 0, 0); // reset rot
		  
		this.speed  = (Math.random() * 26)+4;
		this.clr[3] = (Math.random() );
	  
		this.mesh.scale.x = (Math.random() *  6) + 2;
		this.mesh.scale.y = (Math.random() * 12) + 2;
		
	  this.mesh.material.opacity = 0.0;
		//this.alpha = 0.0;  
	  //console.log(this.speed);
	}
  };
  var container = document.getElementById('container');
  var width = container.clientWidth;
  var height = container.clientHeight; // this is bugged for me
  var aspect = width / height;
  //console.log(container.clientHeight, height);
	
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x000000, 100, 800 );
  
  var camera = new THREE.PerspectiveCamera(90, aspect, 1, 1000);
  camera.position.y = 0;
  camera.position.z = 0;
  
  var renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  
  renderer.render( scene, camera);
  
  var clock = new THREE.Clock();
  
  function animate() {
	requestAnimationFrame(animate);
	var delta = clock.getDelta(),
	time = clock.elapsedTime;
	
	for(var i = 0; i < NUMPLANES; i++) {  
	  planes[i].animate(delta);
	}
	
	renderer.render(scene, camera);
  }
  var NUMPLANES = 50;
  var planes = [];
  for(var i = 0; i < NUMPLANES; i++) {
	planes.push( new hplane() );
	scene.add( planes[planes.length-1].mesh );
  }
  
  animate();
  
