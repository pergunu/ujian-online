/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

var pJS = function(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > .particles-js-canvas-el');

  /* particles.js variables with default values */
  this.pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  };

  /* params settings */
  if(params){
    Object.deepExtend = function(destination, source) {
      for (var property in source) {
        if (source[property] && source[property].constructor &&
         source[property].constructor === Object) {
          destination[property] = destination[property] || {};
          arguments.callee(destination[property], source[property]);
        } else {
          destination[property] = source[property];
        }
      }
      return destination;
    };
    Object.deepExtend(this.pJS, params);
  }

  /* convert hex colors to rgb */
  this.pJS.particles.color.rgb = hexToRgb(this.pJS.particles.color.value);

  /* detect retina */
  this.pJS.retina = false;
  if(this.pJS.retina_detect && window.devicePixelRatio > 1){
    this.pJS.retina = true;
  }

  /* canvas element */
  this.pJS.canvas.ctx = this.pJS.canvas.el.getContext('2d');

  /* then check */
  if(!this.pJS.canvas.ctx){
    console.log('Error - your browser does not support canvas drawing');
    return;
  }

  /* launch initialization */
  this.pJS.fn.canvasInit();
  this.pJS.fn.canvasSize();
  this.pJS.fn.canvasPaint();
  this.pJS.fn.particlesCreate();
  this.pJS.fn.vendors.densityAutoParticles();

  /* particles animation */
  this.pJS.fn.particlesAnimation();

  /* interactivity */
  this.pJS.fn.interactivity.listeners();
  this.pJS.fn.interactivity.modes.clickPushParticles(10);

  /* render */
  if(this.pJS.tmp.img_error == undefined){
    this.pJS.fn.vendors.destroypJS();
    this.pJS.fn.vendors.draw();
  }

};

/* ---------- pJS functions - canvas ------------ */

pJS.fn.canvasInit = function() {

  this.pJS.canvas.el.width = this.pJS.canvas.w;
  this.pJS.canvas.el.height = this.pJS.canvas.h;

  if(this.pJS.retina){
    this.pJS.canvas.el.width = this.pJS.canvas.w * 2;
    this.pJS.canvas.el.height = this.pJS.canvas.h * 2;
    this.pJS.canvas.el.style.width = this.pJS.canvas.w + 'px';
    this.pJS.canvas.el.style.height = this.pJS.canvas.h + 'px';
    this.pJS.canvas.ctx.scale(2, 2);
  }

  this.pJS.canvas.ctx.fillStyle = 'rgba(255,255,255,0)';
  this.pJS.canvas.ctx.fillRect(0, 0, this.pJS.canvas.w, this.pJS.canvas.h);

};

pJS.fn.canvasSize = function() {

  this.pJS.canvas.el.width = this.pJS.canvas.w;
  this.pJS.canvas.el.height = this.pJS.canvas.h;

  if(this.pJS.retina){
    this.pJS.canvas.el.width = this.pJS.canvas.w * 2;
    this.pJS.canvas.el.height = this.pJS.canvas.h * 2;
    this.pJS.canvas.el.style.width = this.pJS.canvas.w + 'px';
    this.pJS.canvas.el.style.height = this.pJS.canvas.h + 'px';
    this.pJS.canvas.ctx.scale(2, 2);
  }

};

pJS.fn.canvasPaint = function() {
  this.pJS.canvas.ctx.fillStyle = this.pJS.canvas.color || 'rgba(255,255,255,0)';
  this.pJS.canvas.ctx.fillRect(0, 0, this.pJS.canvas.w, this.pJS.canvas.h);
};

pJS.fn.canvasClear = function() {
  this.pJS.canvas.ctx.clearRect(0, 0, this.pJS.canvas.w, this.pJS.canvas.h);
};

/* --------- pJS functions - particles ----------- */

pJS.fn.particle = function(color, opacity, position){

  /* size */
  var size = this.pJS.particles.size.value;
  if(this.pJS.particles.size.random){
    size = Math.random() * this.pJS.particles.size.value;
  }

  /* set opacity */
  var opacity = this.pJS.particles.opacity.value;
  if(this.pJS.particles.opacity.random){
    opacity = Math.random() * this.pJS.particles.opacity.value;
  }

  /* position */
  var pos = {
    x: position ? position.x : Math.random() * this.pJS.canvas.w,
    y: position ? position.y : Math.random() * this.pJS.canvas.h
  };

  /* check position - into the canvas */
  if(pos.x > this.pJS.canvas.w - size * 2) pos.x = pos.x - size;
  else if(pos.x < size * 2) pos.x = pos.x + size;
  if(pos.y > this.pJS.canvas.h - size * 2) pos.y = pos.y - size;
  else if(pos.y < size * 2) pos.y = pos.y + size;

  /* check position - avoid overlap */
  for(var i = 0; i < this.pJS.particles.array.length; i++){
    var p2 = this.pJS.particles.array[i];
    var distance = Math.sqrt(Math.pow(pos.x - p2.pos.x, 2) + Math.pow(pos.y - p2.pos.y, 2));
    if(distance < size + p2.size){
      pos.x = pos.x + (Math.random() * size);
      pos.y = pos.y + (Math.random() * size);
      i = -1;
    }
  }

  /* return particle object */
  return {
    pos: pos,
    size: size,
    fill: false,
    color: color,
    opacity: opacity,
    draw: function() {
      this.pJS.canvas.ctx.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.opacity+')';
      this.pJS.canvas.ctx.beginPath();
      this.pJS.canvas.ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
      this.pJS.canvas.ctx.closePath();
      this.pJS.canvas.ctx.fill();
    }
  }

};

pJS.fn.particlesCreate = function(){

  for(var i = 0; i < this.pJS.particles.number.value; i++){
    this.pJS.particles.array.push(this.pJS.fn.particle(this.pJS.particles.color.rgb, this.pJS.particles.opacity.value));
  }

};

pJS.fn.particlesUpdate = function(){

  for(var i = 0; i < this.pJS.particles.array.length; i++){
    var p = this.pJS.particles.array[i];

    // move the particle
    if(this.pJS.particles.move.enable){
      var ms = this.pJS.particles.move.speed / 2;
      p.pos.x += p.vx * ms;
      p.pos.y += p.vy * ms;
    }

    // change opacity
    if(this.pJS.particles.opacity.anim.enable){
      if(p.opacity_status == true){
        if(p.opacity >= this.pJS.particles.opacity.value) p.opacity_status = false;
        p.opacity += this.pJS.particles.opacity.anim.speed;
      }else{
        if(p.opacity <= this.pJS.particles.opacity.anim.opacity_min) p.opacity_status = true;
        p.opacity -= this.pJS.particles.opacity.anim.speed;
      }
    }

    // change size
    if(this.pJS.particles.size.anim.enable){
      if(p.size_status == true){
        if(p.size >= this.pJS.particles.size.value) p.size_status = false;
        p.size += this.pJS.particles.size.anim.speed;
      }else{
        if(p.size <= this.pJS.particles.size.anim.size_min) p.size_status = true;
        p.size -= this.pJS.particles.size.anim.speed;
      }
    }

    // change particle position if it is out of canvas
    if(this.pJS.particles.move.out_mode == 'bounce'){
      var new_pos = {
        x_left: p.size,
        x_right: this.pJS.canvas.w - p.size,
        y_top: p.size,
        y_bottom: this.pJS.canvas.h - p.size
      }
    }else{
      var new_pos = {
        x_left: -p.size,
        x_right: this.pJS.canvas.w + p.size,
        y_top: -p.size,
        y_bottom: this.pJS.canvas.h + p.size
      }
    }

    if(p.pos.x < new_pos.x_left){
      p.pos.x = new_pos.x_left;
      p.vx = -p.vx;
    }else if(p.pos.x > new_pos.x_right){
      p.pos.x = new_pos.x_right;
      p.vx = -p.vx;
    }

    if(p.pos.y < new_pos.y_top){
      p.pos.y = new_pos.y_top;
      vy = -vy;
    }else if(p.pos.y > new_pos.y_bottom){
      p.pos.y = new_pos.y_bottom;
      vy = -vy;
    }

    // out of canvas
    if(this.pJS.particles.move.out_mode == 'out'){
      if(p.pos.x + p.size < 0){
        p.pos.x = this.pJS.canvas.w + p.size;
        p.pos.y = Math.random() * this.pJS.canvas.h;
      }
      else if(p.pos.x - p.size > this.pJS.canvas.w){
        p.pos.x = -p.size;
        p.pos.y = Math.random() * this.pJS.canvas.h;
      }

      if(p.pos.y + p.size < 0){
        p.pos.y = this.pJS.canvas.h + p.size;
        p.pos.x = Math.random() * this.pJS.canvas.w;
      }
      else if(p.pos.y - p.size > this.pJS.canvas.h){
        p.pos.y = -p.size;
        p.pos.x = Math.random() * this.pJS.canvas.w;
      }
    }

    // interaction between particles
    if(this.pJS.particles.line_linked.enable || this.pJS.particles.move.attract.enable){
      for(var j = i + 1; j < this.pJS.particles.array.length; j++){
        var p2 = this.pJS.particles.array[j];

        // link particles
        if(this.pJS.particles.line_linked.enable){
          var distance = Math.sqrt(Math.pow(p.pos.x - p2.pos.x, 2) + Math.pow(p.pos.y - p2.pos.y, 2));
          if(distance <= this.pJS.particles.line_linked.distance){

            var opacity_line = this.pJS.particles.line_linked.opacity - (distance / (1/this.pJS.particles.line_linked.opacity)) / this.pJS.particles.line_linked.distance;
            if(opacity_line > 0){

              // draw a line between particles
              this.pJS.canvas.ctx.strokeStyle = 'rgba('+this.pJS.particles.line_linked.color.r+','+this.pJS.particles.line_linked.color.g+','+this.pJS.particles.line_linked.color.b+','+opacity_line+')';
              this.pJS.canvas.ctx.lineWidth = this.pJS.particles.line_linked.width;
              this.pJS.canvas.ctx.beginPath();
              this.pJS.canvas.ctx.moveTo(p.pos.x, p.pos.y);
              this.pJS.canvas.ctx.lineTo(p2.pos.x, p2.pos.y);
              this.pJS.canvas.ctx.stroke();
              this.pJS.canvas.ctx.closePath();

            }

          }
        }

        // attract particles
        if(this.pJS.particles.move.attract.enable){
          var distance = Math.sqrt(Math.pow(p.pos.x - p2.pos.x, 2) + Math.pow(p.pos.y - p2.pos.y, 2));
          if(distance <= this.pJS.particles.move.attract.rotateX * 1.5){

            var ax = (p.pos.x - p2.pos.x) / distance * this.pJS.particles.move.attract.rotateX;
            var ay = (p.pos.y - p2.pos.y) / distance * this.pJS.particles.move.attract.rotateY;

            p.vx -= ax;
            p.vy -= ay;
            p2.vx += ax;
            p2.vy += ay;

          }
        }

      }
    }

  }

};

pJS.fn.particlesDraw = function(){

  /* clear canvas */
  this.pJS.fn.canvasClear();

  /* update each particles param */
  this.pJS.fn.particlesUpdate();

  /* draw each particle */
  for(var i = 0; i < this.pJS.particles.array.length; i++){
    var p = this.pJS.particles.array[i];
    p.draw();
  }

};

pJS.fn.particlesAnimation = function(){

  this.pJS.fn.particlesDraw();
  if(this.pJS.tmp.img_error == undefined){
    if(this.pJS.particles.move.enable){
      requestAnimFrame(this.pJS.fn.particlesAnimation.bind(this));
    }
  }

};

/* ---------- pJS functions - vendors ------------ */

pJS.fn.vendors.densityAutoParticles = function(){

  if(this.pJS.particles.number.density.enable){

    /* calc area */
    var area = this.pJS.canvas.el.width * this.pJS.canvas.el.height / 1000;
    if(this.pJS.retina){
      area = area / (this.pJS.canvas.pxratio * 2);
    }

    /* calc number of particles based on density area */
    var nb_particles = area * this.pJS.particles.number.density.value_area;

    /* add or remove particles */
    var missing_particles = this.pJS.particles.number.value - this.pJS.particles.array.length;
    if(missing_particles > 0){
      for(var i = 0; i < missing_particles; i++){
        this.pJS.particles.array.push(this.pJS.fn.particle(this.pJS.particles.color.rgb, this.pJS.particles.opacity.value));
      }
    }else{
      for(var i = 0; i < Math.abs(missing_particles); i++){
        var rand = Math.floor(Math.random() * this.pJS.particles.array.length);
        this.pJS.particles.array.splice(rand, 1);
      }
    }

  }

};

pJS.fn.vendors.draw = function(){

  this.pJS.fn.particlesDraw();
  requestAnimFrame(this.pJS.fn.vendors.draw.bind(this));

};

pJS.fn.vendors.checkBeforeDraw = function(){

  /* if shape is image */
  if(this.pJS.particles.shape.type == 'image'){

    if(this.pJS.tmp.img_type == 'svg'){

      var check = 0;
      for(var i = 0; i < this.pJS.particles.array.length; i++){
        var p = this.pJS.particles.array[i];
        if(p.img.ready == false){
          check++;
        }
      }
      if(check == 0){
        this.pJS.fn.vendors.draw();
      }else{
        setTimeout(this.pJS.fn.vendors.checkBeforeDraw.bind(this), 100);
      }

    }else{

      if(this.pJS.tmp.img_error == undefined){
        this.pJS.fn.vendors.draw();
      }

    }

  }else{
    this.pJS.fn.vendors.draw();
  }

};

pJS.fn.vendors.destroypJS = function(){
  cancelAnimationFrame(this.pJS.fn.drawAnimFrame);
  canvas_el.remove();
};

/* ---------- pJS functions - events ------------ */

pJS.fn.interactivity.listeners = function(){

  /* init events */
  if(this.pJS.interactivity.events.onhover.enable || this.pJS.interactivity.events.onclick.enable){

    /* el on mousemove */
    this.pJS.interactivity.el.addEventListener('mousemove', function(e){

      this.pJS.interactivity.mouse.pos_x = e.offsetX || e.clientX;
      this.pJS.interactivity.mouse.pos_y = e.offsetY || e.clientY;

      if(this.pJS.interactivity.status == 'mousemove'){
        this.pJS.interactivity.el.style.cursor = 'move';
      }

    }.bind(this));

    /* el on onmouseleave */
    this.pJS.interactivity.el.addEventListener('mouseleave', function(e){

      this.pJS.interactivity.mouse.pos_x = null;
      this.pJS.interactivity.mouse.pos_y = null;
      this.pJS.interactivity.status = 'mouseleave';

    }.bind(this));

  }

  /* on click */
  if(this.pJS.interactivity.events.onclick.enable){

    this.pJS.interactivity.el.addEventListener('click', function(){

      this.pJS.interactivity.mouse.click_pos_x = this.pJS.interactivity.mouse.pos_x;
      this.pJS.interactivity.mouse.click_pos_y = this.pJS.interactivity.mouse.pos_y;
      this.pJS.interactivity.mouse.click_time = new Date().getTime();

      if(this.pJS.interactivity.events.onclick.enable){
        switch(this.pJS.interactivity.events.onclick.mode){
          case 'push':
            this.pJS.fn.interactivity.modes.pushParticles(this.pJS.interactivity.modes.push.particles_nb, this.pJS.interactivity.mouse);
            break;
          case 'remove':
            this.pJS.fn.interactivity.modes.removeParticles(this.pJS.interactivity.modes.remove.particles_nb);
            break;
          case 'bubble':
            this.pJS.fn.interactivity.modes.bubbleParticles();
            break;
          case 'repulse':
            this.pJS.fn.interactivity.modes.repulseParticles();
            break;
        }
      }

    }.bind(this));

  }

};

pJS.fn.interactivity.modes.pushParticles = function(nb, pos){

  this.pJS.fn.particlesCreate(nb, pos);

};

pJS.fn.interactivity.modes.removeParticles = function(nb){

  for(var i = 0; i < nb; i++){
    var p = this.pJS.particles.array.pop();
    if(p){
      p = null;
    }
  }

};

pJS.fn.interactivity.modes.bubbleParticles = function(){

  /* on hover event */
  if(this.pJS.interactivity.events.onhover.enable && this.pJS.interactivity.status == 'mousemove'){

    var dx_mouse = this.pJS.interactivity.mouse.pos_x - this.pJS.canvas.w/2;
    var dy_mouse = this.pJS.interactivity.mouse.pos_y - this.pJS.canvas.h/2;
    var distance_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);
    var dist_mouse = this.pJS.interactivity.modes.bubble.distance;
    var time = this.pJS.interactivity.modes.bubble.duration;
    var size = this.pJS.interactivity.modes.bubble.size;

    if(distance_mouse <= dist_mouse){

      for(var i = 0; i < this.pJS.particles.array.length; i++){
        var p = this.pJS.particles.array[i];

        var dx = this.pJS.interactivity.mouse.pos_x - p.pos.x;
        var dy = this.pJS.interactivity.mouse.pos_y - p.pos.y;
        var distance = Math.sqrt(dx*dx + dy*dy);
        var opacity = this.pJS.interactivity.modes.bubble.opacity - (distance * this.pJS.interactivity.modes.bubble.opacity / dist_mouse);

        if(opacity > 0){

          /* size */
          if(distance <= dist_mouse){
            if(p.size < size){
              var size_p = p.size + (size * 1.5 - p.size) / time;
              if(size_p >= 0) p.size = size_p;
            }
          }

          /* opacity */
          if(distance <= dist_mouse){
            if(p.opacity < opacity){
              p.opacity = opacity;
            }
          }

        }

      }

    }

  }

  /* on click event */
  else if(this.pJS.interactivity.events.onclick.enable && this.pJS.interactivity.mouse.click_pos_x != null && this.pJS.interactivity.mouse.click_pos_y != null){

    var dx_click = this.pJS.interactivity.mouse.click_pos_x - this.pJS.canvas.w/2;
    var dy_click = this.pJS.interactivity.mouse.click_pos_y - this.pJS.canvas.h/2;
    var distance_click = Math.sqrt(dx_click*dx_click + dy_click*dy_click);
    var dist_click = this.pJS.interactivity.modes.bubble.distance;
    var time = this.pJS.interactivity.modes.bubble.duration;
    var size = this.pJS.interactivity.modes.bubble.size;

    if(distance_click <= dist_click){

      for(var i = 0; i < this.pJS.particles.array.length; i++){
        var p = this.pJS.particles.array[i];

        var dx = this.pJS.interactivity.mouse.click_pos_x - p.pos.x;
        var dy = this.pJS.interactivity.mouse.click_pos_y - p.pos.y;
        var distance = Math.sqrt(dx*dx + dy*dy);
        var opacity = this.pJS.interactivity.modes.bubble.opacity - (distance * this.pJS.interactivity.modes.bubble.opacity / dist_click);

        if(opacity > 0){

          /* size */
          if(distance <= dist_click){
            if(p.size < size){
              var size_p = p.size + (size * 1.5 - p.size) / time;
              if(size_p >= 0) p.size = size_p;
            }
          }

          /* opacity */
          if(distance <= dist_click){
            if(p.opacity < opacity){
              p.opacity = opacity;
            }
          }

        }

      }

    }

  }

};

pJS.fn.interactivity.modes.repulseParticles = function(){

  /* on hover event */
  if(this.pJS.interactivity.events.onhover.enable && this.pJS.interactivity.status == 'mousemove'){

    var dx_mouse = this.pJS.interactivity.mouse.pos_x - this.pJS.canvas.w/2;
    var dy_mouse = this.pJS.interactivity.mouse.pos_y - this.pJS.canvas.h/2;
    var distance_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);
    var dist_mouse = this.pJS.interactivity.modes.repulse.distance;
    var force = this.pJS.interactivity.modes.repulse.strength;

    if(distance_mouse <= dist_mouse){

      for(var i = 0; i < this.pJS.particles.array.length; i++){
        var p = this.pJS.particles.array[i];

        var dx = this.pJS.interactivity.mouse.pos_x - p.pos.x;
        var dy = this.pJS.interactivity.mouse.pos_y - p.pos.y;
        var distance = Math.sqrt(dx*dx + dy*dy);
        var repulseFactor = force * (1 - Math.pow(distance/dist_mouse, 2));

        if(distance <= dist_mouse){
          p.vx += dx * repulseFactor * 0.01;
          p.vy += dy * repulseFactor * 0.01;
        }

      }

    }

  }

  /* on click event */
  else if(this.pJS.interactivity.events.onclick.enable && this.pJS.interactivity.mouse.click_pos_x != null && this.pJS.interactivity.mouse.click_pos_y != null){

    var dx_click = this.pJS.interactivity.mouse.click_pos_x - this.pJS.canvas.w/2;
    var dy_click = this.pJS.interactivity.mouse.click_pos_y - this.pJS.canvas.h/2;
    var distance_click = Math.sqrt(dx_click*dx_click + dy_click*dy_click);
    var dist_click = this.pJS.interactivity.modes.repulse.distance;
    var force = this.pJS.interactivity.modes.repulse.strength;

    if(distance_click <= dist_click){

      for(var i = 0; i < this.pJS.particles.array.length; i++){
        var p = this.pJS.particles.array[i];

        var dx = this.pJS.interactivity.mouse.click_pos_x - p.pos.x;
        var dy = this.pJS.interactivity.mouse.click_pos_y - p.pos.y;
        var distance = Math.sqrt(dx*dx + dy*dy);
        var repulseFactor = force * (1 - Math.pow(distance/dist_click, 2));

        if(distance <= dist_click){
          p.vx += dx * repulseFactor * 0.01;
          p.vy += dy * repulseFactor * 0.01;
        }

      }

    }

  }

};

pJS.fn.interactivity.modes.clickPushParticles = function(nb){

  if(this.pJS.interactivity.events.onclick.enable){
    this.pJS.fn.interactivity.modes.pushParticles(nb, this.pJS.interactivity.mouse);
  }

};

/* ---------- pJS functions - execution ------------ */

pJS.fn.canvasInit = function() {
  this.pJS.canvas.el.width = this.pJS.canvas.w;
  this.pJS.canvas.el.height = this.pJS.canvas.h;

  if(this.pJS.retina){
    this.pJS.canvas.el.width = this.pJS.canvas.w * 2;
    this.pJS.canvas.el.height = this.pJS.canvas.h * 2;
    this.pJS.canvas.el.style.width = this.pJS.canvas.w + 'px';
    this.pJS.canvas.el.style.height = this.pJS.canvas.h + 'px';
    this.pJS.canvas.ctx.scale(2, 2);
  }

  this.pJS.canvas.ctx.fillStyle = 'rgba(255,255,255,0)';
  this.pJS.canvas.ctx.fillRect(0, 0, this.pJS.canvas.w, this.pJS.canvas.h);
};

pJS.fn.canvasSize = function() {
  this.pJS.canvas.el.width = this.pJS.canvas.w;
  this.pJS.canvas.el.height = this.pJS.canvas.h;

  if(this.pJS.retina){
    this.pJS.canvas.el.width = this.pJS.canvas.w * 2;
    this.pJS.canvas.el.height = this.pJS.canvas.h * 2;
    this.pJS.canvas.el.style.width = this.pJS.canvas.w + 'px';
    this.pJS.canvas.el.style.height = this.pJS.canvas.h + 'px';
    this.pJS.canvas.ctx.scale(2, 2);
  }
};

pJS.fn.canvasPaint = function() {
  this.pJS.canvas.ctx.fillStyle = this.pJS.canvas.color || 'rgba(255,255,255,0)';
  this.pJS.canvas.ctx.fillRect(0, 0, this.pJS.canvas.w, this.pJS.canvas.h);
};

pJS.fn.canvasClear = function() {
  this.pJS.canvas.ctx.clearRect(0, 0, this.pJS.canvas.w, this.pJS.canvas.h);
};

/* --------- pJS functions - vendors ------------ */

pJS.fn.vendors.eventsListeners = function(){

  /* events target element */
  if(this.pJS.interactivity.el == 'window'){
    this.pJS.interactivity.el = window;
  }else if(this.pJS.interactivity.el == 'canvas'){
    this.pJS.interactivity.el = this.pJS.canvas.el;
  }

  /* detect retina */
  this.pJS.retina = false;
  if(this.pJS.retina_detect && window.devicePixelRatio > 1){
    this.pJS.retina = true;
  }

  /* canvas element */
  this.pJS.canvas.ctx = this.pJS.canvas.el.getContext('2d');

  /* then check */
  if(!this.pJS.canvas.ctx){
    console.log('Error - your browser does not support canvas drawing');
    return;
  }

  /* launch initialization */
  this.pJS.fn.canvasInit();
  this.pJS.fn.canvasSize();
  this.pJS.fn.canvasPaint();
  this.pJS.fn.particlesCreate();
  this.pJS.fn.vendors.densityAutoParticles();

  /* particles animation */
  this.pJS.fn.particlesAnimation();

  /* interactivity */
  this.pJS.fn.interactivity.listeners();
  this.pJS.fn.interactivity.modes.clickPushParticles(10);

  /* render */
  if(this.pJS.tmp.img_error == undefined){
    this.pJS.fn.vendors.destroypJS();
    this.pJS.fn.vendors.draw();
  }

};

/* ---------- pJS functions - start ------------ */

pJS.fn.start = function(){

  /* init canvas + particles */
  this.pJS.fn.vendors.eventsListeners();

};

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = (function(){
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
})();

/* ---------- global functions - HEX colors to RGB ------------ */

function hexToRgb(hex){
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/* ---------- particles.js functions - start ------------ */

window.particlesJS = function(tag_id, params){

  //console.log(params);

  /* var pJS = function(tag_id, params){ */
  var pJS = new pJS(tag_id, params);

  /* start the animation */
  pJS.fn.start();

};

window.particlesJS.load = function(tag_id, path_config_json, callback){

  /* load json config */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function (data) {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var params = JSON.parse(data.currentTarget.response);
        window.particlesJS(tag_id, params);
        if(callback) callback();
      }else{
        console.log('Error pJS - XMLHttpRequest status: '+xhr.status);
        console.log('Error pJS - File config not found');
      }
    }
  };
  xhr.send();

};
