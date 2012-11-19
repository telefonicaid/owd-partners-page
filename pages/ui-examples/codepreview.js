//Code preview for UI examples
(function(){

	//Sets apperance for highlighted layer
	function addHighligth(element, context) {
		var tWidth = element.clientWidth;
		var tHeight = element.clientHeight;
		var tLeft = element.offsetLeft;
		var tTop = element.offsetTop;

		var highlight = context.createElement("div");
		highlight.id = "bb-codepreview-highlight";
		highlight.style.position = "absolute";
		highlight.style.left = tLeft+"px";
		highlight.style.top = tTop+"px";
		highlight.style.width = tWidth-2+"px";
		highlight.style.height = tHeight-2+"px";
		highlight.style.zIndex = 2147483647; //Max allowed z-index
		highlight.style.pointerEvents = "none";
		highlight.style.background = "rgba(0, 150, 221, 0.4)";
		highlight.style.border = "solid 1px rgb(0, 150, 221)";

		context.body.appendChild(highlight);
	}

	//Remove highlighted layer
	function removeHighligth(context) {
		var highlight = context.getElementById("bb-codepreview-highlight");
		highlight.parentNode.removeChild(highlight);
	}


	// Generates and append the HTML code from the given element
	function appendHtmlCode(element, location) {

		//Remove footprints
		element.removeAttribute('data-snippet');

		//Create HTML entities
		finalCode =element.outerHTML.toString().replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]});
		location.innerHTML = finalCode;

		//Restore footprints
		element.setAttribute('data-snippet', null);
        }


 	//tabbed exampels
 	function tabs(context) {

 		var receiver = context;
 		var trigger = receiver.parentNode.querySelectorAll('[data-tab="trigger"] a')

 		for ( var i in trigger ) {
			if ( trigger[i].nodeType == 1 ) {

				trigger[i].addEventListener('click', function(e){
					var path = this.getAttribute('href');

					//Remove previously set 'active'
					for ( var a in trigger ) {
						if ( trigger[a].nodeType == 1 ) {
							trigger[a].parentNode.classList.remove('active');
						}
					}

					receiver.setAttribute('src', path);
					this.parentNode.classList.add('active');
					e.preventDefault();
				});
			}
 		}

 	}


	//Frame DOM load
	window.addEventListener('DOMFrameContentLoaded', function(e){
			var _document = e.target.contentDocument;
			var codePreview = e.target.parentNode.querySelector(".bb-code");

			//Attach user interaction events
			var hoverTargets = _document.querySelectorAll('[data-snippet]')
			for ( var i in hoverTargets ) {
				if ( hoverTargets[i].nodeType == 1 ) {
					hoverTargets[i].addEventListener("mouseover", function(e){
						e.stopImmediatePropagation();
						addHighligth(this, _document);
					});

					hoverTargets[i].addEventListener("mouseout", function(e){
						e.stopImmediatePropagation();
						removeHighligth(_document);
					});

					hoverTargets[i].addEventListener("click", function(e){
						e.stopImmediatePropagation();
						appendHtmlCode(this, codePreview);
					});
				}
			}
	});


	//Main DOM load
	document.addEventListener('DOMContentLoaded', function(){

		var tabsTargets = document.querySelectorAll('[data-tab="receiver"]');
		for ( var i in tabsTargets ) {
			if ( tabsTargets[i].nodeType == 1 ) {
				tabs(tabsTargets[i]);
			}
		}

	});

})();