
const cityImageMap = {
    'New York City': 'english_DDAI.png',
    'Delhi': 'hindi_DDAI.png',       
    'Toronto': 'english_DDAI.png',
    'Mumbai':'hindi_DDAI.png', 
    'Los Angeles': 'english_DDAI.png',
    'Jakarta': 'indonesian_DDAI.png',
    'Lima': 'spanish_DDAI.png',
    'Nagoya': 'japanese_DDAI.png',       
    'Rio de Janeiro': 'portugese_DDAI.png',        
    'Washington': 'english_DDAI.png',
    'Beijing': 'chinese_DDAI.png',            
    'Charlotte': 'english_DDAI.png',
    'Bangkok': 'Thai_DDAI.png',        
    'Denver': 'english_DDAI.png',
    'Kolkata': 'hindi_DDAI.png', 
    'Los Angeles': 'english_DDAI.png',
    'Manila': 'tagalog_DDAI',
    'Moscow': 'russian_DDAI.png',
    'Tokyo': 'japanese_DDAI.png',
    'Amsterdam': 'dutch_DDAI.png',
    'Singapore': 'english_DDAI.png',
    'San Francisco': 'english_DDAI.png',        
    'Luxembourg':'luxembourgesh_DDAI.png',
    'Shanghai': 'chinese_DDAI.png',
    'Munich':'german_DDAI.png',
    'Cairo': 'arabic_DDAI.png',       
    'Mexico City': 'spanish_DDAI.png',
    'Hong Kong': 'chinese_DDAI.png',
    'Bogota': 'spanish_DDAI.png',
    'Mexico City': 'spanish_DDAI.png',
    'Jakarta': 'indonesian_DDAI.png',
    'Lima': 'spanish_DDAI.png',
    'Nagoya': 'japanese_DDAI.png',        
    'Rio de Janeiro': 'portugese_DDAI.png',
    'Buenos Aires':'spanish_DDAI.png',
    'Bogata':'spanish_DDAI.png',    
    'Santiago': 'spanish_DDAI.png',
    'London': 'english_DDAI.png',
    'Madrid': 'spanish_DDAI.png',
    'Melbourne': 'english_DDAI.png',
    'Paris': 'french_DDAI.png',
    'Tokyo': 'japanese_DDAI.png',
    'Amsterdam': 'dutch_DDAI.png',
    'Singapore': 'english_DDAI.png',
    'Luxembourg': 'luxembourgesh_DDAI.png',
    'Shanghai': 'chinese_DDAI.png',
    'Munich': 'german_DDAI.png',
    'Cairo': 'arabic_DDAI.png',
    'Zurich':'german_DDAI.png',
    'Milan': 'italian_DDAI.png',
    'Istanbul': 'turkish_DDAI.png',
    'Johannesburg': 'afrikaans_DDAI.png',
    'Chennai': 'hindi_DDAI.png',         
    'Lagos': 'english_DDAI.png',
    'Sydney': 'english_DDAI.png',
    'Seoul': 'korean_DDAI.png',
    'Dublin':'english_DDAI.png',
    'Zurich': 'german_DDAI.png',   
    'Dubai': 'arabic_DDAI.png',
    'Oslo': 'norwegian_DDAI.png',
    'Manila': 'filipino_DDAI.png'
};

document.addEventListener('DOMContentLoaded', function() {
    const svg = setupSVG();
    const projection = defineProjection();
    const cities = defineCities();

    drawCities(svg, cities, projection); 
    drawCityLabels(svg, cities, projection);
    animateCityLinks(svg, cities, projection); // Call to start the animation

    // Adding event listener on body for mousemove to ensure popups hide when the mouse is not over a city
    document.body.addEventListener('mousemove', function(event) {
        if (!event.target.classList.contains('city')) {
            hideAllPopups();
        }
    });
});




// Rest of the globe.js code...
function setupSVG() {
    //console.log("Setting up SVG");    
    const svg = d3.select('#globe-container').append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .style('position', 'absolute')
        .style('top', '0')
        .style('left', '0')
    // Define the defs block for SVG filters and gradients
    const defs = svg.append('defs');

    // Define a glow filter with a Gaussian blur and color matrix operations
    console.log("Defining glow filter");
    const glowFilter = defs.append('filter')
        .attr('id', 'glow-filter')
        .attr('width', '300%')
        .attr('height', '300%')
        .attr('x', '-100%')
        .attr('y', '-100%');

    console.log("Glow filter defined:", glowFilter);

    const feGaussianBlur = glowFilter.append('feGaussianBlur')
    .attr('class', 'blur-value')
    .attr('stdDeviation', 2.5)
    .attr('result', 'coloredBlur');

    // Create an animate element to change the stdDeviation attribute over time
    feGaussianBlur.append('animate')
    .attr('attributeName', 'stdDeviation')
    .attr('values', '2.5; 10; 2.5') // Pulsate between the values 2.5 and 5
    .attr('dur', '2s') // Duration of the animation
    .attr('repeatCount', 'indefinite'); // Repeat the animation indefinitely

    const componentTransfer = glowFilter.append('feComponentTransfer')
    .attr('result', 'boostedGlow');
    componentTransfer.append('feFuncA')
    .attr('type', 'linear')
    .attr('slope', '2')  // Increase the slope to boost the alpha channel
    .attr('intercept', '0');  // Adjust if needed to modify overall transparency


    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode')
        .attr('in', 'boostedGlow');
    feMerge.append('feMergeNode')
        .attr('in', 'SourceGraphic');
    console.log("feMerge Glow filter appended:", glowFilter); 

    // Define a linear gradient for the fire-like effect
const fireGradient = defs.append('linearGradient')
    .attr('id', 'fireGradient')
    .attr('gradientUnits', 'userSpaceOnUse');
fireGradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#ff8c00') // A brighter color for more visibility
    .attr('stop-opacity', '1');    // Full opacity for start of gradient
fireGradient.append('stop')
    .attr('offset', '50%')
    .attr('stop-color', '#ff4500') // Bright orange
    .attr('stop-opacity', '1');    // Full opacity for mid-gradient
fireGradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#b22222') // Dark red
    .attr('stop-opacity', '1');    // Full opacity for end of gradient
    console.log("SVG Defs block created:", defs);

    return svg;
}



document.addEventListener('DOMContentLoaded', function() {
    const staticPopup = document.getElementById('city-popup');
    staticPopup.style.display = 'block';  // Force display
    staticPopup.style.left = '50px';
    staticPopup.style.top = '50px';
    console.log("Static test - Popup displayed");
});


function animateCityLinks(svg, cities, projection, index = 0) {
    ////console.log(`Animating city link at index ${index}, city name: ${cities[index].name}`);

    // Handling to cycle back to the first city after the last one
    const nextIndex = (index + 1) % cities.length; // Use modulus to loop back

    const currentCity = cities[index];
    const nextCity = cities[nextIndex];
    const duration = 3000; // Duration of the animation in milliseconds
    const startNextDelay = duration * 0.25; // Start next animation when 25% of the way through the current animation

    startAnimationForCityPair(svg, currentCity, nextCity, projection, duration, () => {
        //console.log(`Completed animation from ${currentCity.name} to ${nextCity.name}`);
    });

    // Set timeout to call the next pair with the calculated delay
    setTimeout(() => {
        animateCityLinks(svg, cities, projection, nextIndex);
    }, startNextDelay);
}

function startAnimationForCityPair(svg, currentCity, nextCity, projection, duration, callback) {
    //console.log(`Preparing to animate from ${currentCity.name} to ${nextCity.name}`);
    const start = projection(currentCity.coordinates);
    const end = projection(nextCity.coordinates);

    // Calculate control point for a nice arc
    const control = [(start[0] + end[0]) / 2, Math.min(start[1], end[1]) - Math.abs(start[0] - end[0]) / 2];

    // Create a gradient for the path
    const gradientId = `gradient-${currentCity.name}-to-${nextCity.name}`;
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", gradientId)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", start[0])
      .attr("y1", start[1])
      .attr("x2", end[0])
      .attr("y2", end[1]);
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#ff0");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#f00");

    // Create the path with the gradient
    const path = svg.append("path")
    .attr("d", `M${start[0]} ${start[1]} Q${control[0]} ${control[1]} ${end[0]} ${end[1]}`)
    .style("stroke", "url(#fireGradient)") // Use the defined gradient for stroke
    .style("stroke-width", 4) // Increase the stroke width for visibility
    .style("fill", "none");

    //console.log(`Path created from ${currentCity.name} to ${nextCity.name}`);

    const totalLength = path.node().getTotalLength();
    path.style("stroke-dasharray", `${totalLength} ${totalLength}`)
        .style("stroke-dashoffset", totalLength);


    const movingDot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "blue")
        .attr("transform", `translate(${start[0]}, ${start[1]})`);

    //console.log(`Starting dot animation from ${currentCity.name} to ${nextCity.name}`);
    movingDot.transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attrTween("transform", translateAlongPath(path.node()))
        .on("start", () => {
            //console.log(`Dot started moving from ${currentCity.name} to ${nextCity.name}`);
            path.transition()
                .duration(duration)
                .ease(d3.easeLinear)
                .style("stroke-dashoffset", 0)
                .on("end", () => {
                    //console.log(`Path animation ended for ${currentCity.name} to ${nextCity.name}`);
                    path.remove();
                });
        })
        .on("end", () => {
            //console.log(`Dot animation ended for ${currentCity.name} to ${nextCity.name}`);
            movingDot.remove();
            if (callback) callback();
        });
}


function translateAlongPath(path) {
    const l = path.getTotalLength();
    return function(d, i, a) {
        return function(t) {
            const p = path.getPointAtLength(t * l);
            return `translate(${p.x},${p.y})`;
        };
    };
}




function defineProjection() {
    //console.log("Defining projection");
    const width = window.innerWidth;
    const height = window.innerHeight;
    const projection = d3.geoMercator().center([0, 20]).scale(width / (2 * Math.PI)).translate([width / 2, height / 2]);
    //console.log(`Projection defined with center [0,20], scale based on width`);
    return projection;
}

function defineCities() {
    //console.log("Defining cities");
    // Insert your actual cities data here
    return [
        { name: 'New York City', coordinates: [-76.0060, 41.7128] },
        { name: 'Delhi', coordinates: [57.1025, 31.7041] },        
        { name: 'Toronto', coordinates: [-79.3832, 43.6532] },
        { name: 'Mumbai', coordinates: [51.8777, 23.0760] },
        { name: 'Los Angeles', coordinates: [-113.2437, 36.0522] },
        { name: 'Jakarta', coordinates: [82.8650, -0.5] },
        { name: 'Lima', coordinates: [-81.0428, -5.0464] },
        { name: 'Nagoya', coordinates: [107.9066, 35.1815] },        
        { name: 'Rio de Janeiro', coordinates: [-53.1729, -18.9068] },        
        { name: 'Washington', coordinates: [-79, 38]},
        { name: 'Beijing', coordinates: [93.4737, 36.2304] },            
        { name: 'Charlotte', coordinates: [-83.8431, 35.2271] },
        { name: 'Bangkok', coordinates: [77.5018, 17.7563] },        
        { name: 'Denver', coordinates: [-107.9903, 40.7392] },
        { name: 'Kolkata', coordinates: [67.0099, 24.8615] },
        { name: 'Los Angeles', coordinates: [-113.2437, 36.0522] },
        { name: 'Manila', coordinates: [97.9842, 19.5995] },    
        { name: 'San Francisco', coordinates: [-117.4194, 37.7749] },
        { name: 'Moscow', coordinates: [21.5946, 36.9716] },
        { name: 'Tokyo', coordinates: [111.6917, 37.6895] },
        { name: 'Amsterdam', coordinates: [-4.9041, 51.3676] },
        { name: 'Singapore', coordinates: [79.8198, 8.3521] },
        { name: 'San Francisco', coordinates: [-117.4194, 37.7749] },        
        { name: 'Luxembourg', coordinates: [-7.1296, 48.8153] },
        { name: 'Shanghai', coordinates: [96.4737, 32.2304] },
        { name: 'Munich', coordinates: [0, 47.1351] },
        { name: 'Cairo', coordinates: [14.2357, 32.0444] },       
        { name: 'Mexico City', coordinates: [-101.1332, 21.4326] },
        { name: 'Hong Kong', coordinates: [89.2644, 26.1291] },
        { name: 'Bogotá', coordinates: [-76.0721, 8.5110] },
        { name: 'Jakarta', coordinates: [82.8650, -0.5] },
        { name: 'Lima', coordinates: [-81.0428, -5.0464] },
        { name: 'Nagoya', coordinates: [107.9066, 35.1815] },        
        { name: 'Rio de Janeiro', coordinates: [-53.1729, -18.9068] },
        { name: 'Buenos Aires', coordinates: [-64.3816, -30.6037] },
        { name: 'Santiago', coordinates: [-74.3816, -26.6037] },
        { name: 'London', coordinates: [-12.1276, 49.5074] },
        { name: 'Madrid', coordinates: [-14.7038, 42.4168] },
        { name: 'Melbourne', coordinates: [117.9631, -29.8136] },
        { name: 'Paris', coordinates: [-10.3522, 46.8566] },
        { name: 'Tokyo', coordinates: [111.6917, 37.6895] },
        { name: 'Amsterdam', coordinates: [-4.9041, 51.3676] },
        { name: 'Singapore', coordinates: [79.8198, 8.3521] },
        { name: 'Luxembourg', coordinates: [-7.1296, 48.8153] },
        { name: 'Shanghai', coordinates: [96.4737, 32.2304] },
        { name: 'Munich', coordinates: [0, 47.1351] },
        { name: 'Cairo', coordinates: [14.2357, 32.0444] },
        { name: 'Zurich', coordinates: [-3.1900, 45.4642] },
        { name: 'Milan', coordinates: [-5.5417, 45.3769] },
        { name: 'Istanbul', coordinates: [12.9784, 41.0082] },
        { name: 'Johannesburg', coordinates: [13.0473, -18.2041] },
        { name: 'Chennai', coordinates: [61.2707, 19.0827] },        
        { name: 'Lagos', coordinates: [-8.3792, 12.5244] },
        { name: 'Sydney', coordinates: [120.2093, -27.8688] },
        { name: 'Seoul', coordinates: [100.9780, 39.5665] },
        { name: 'Dublin', coordinates: [-17.1276, 50.5074] },
        { name: 'Zurich', coordinates: [-3.1900, 45.4642] },   
        { name: 'Dubai', coordinates: [37.2708, 28.2048] },
        { name: 'Oslo', coordinates: [-2.7522, 57.9139] },

        // Add more cities as needed
    ];
}

function createCityLinks(cities) {
    //console.log("Creating links between cities");
    let links = [];
    for (let i = 0; i < cities.length - 1; i++) {
        links.push({
            source: cities[i].coordinates,
            target: cities[i + 1].coordinates
            
        });

    }
    return links;
}

function drawCityLinks(svg, links, projection) {
    //console.log(`Attempting to draw ${links.length} links`);
    const linkGenerator = d3.linkHorizontal()
        .x(d => projection(d)[0])
        .y(d => projection(d)[1]);

    const drawnLinks = svg.selectAll('.link')
        .data(links)
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', linkGenerator)
        .style('stroke', 'cyan')
        .style('stroke-width', '2px')
        .style('fill', 'none');

    //console.log(`Links drawn: ${svg.selectAll('.link').size()}`);
}

function drawCities(svg, cities, projection) {
    console.log("Drawing cities, attaching events");
    const citySelection = svg.selectAll('.city')
        .data(cities).enter()
        .append('circle')
        .attr('class', 'city')
        .attr('cx', d => projection(d.coordinates)[0])
        .attr('cy', d => projection(d.coordinates)[1])
        .attr('r', '5')
        .attr('fill', 'silver')
        .style('filter', 'url(#glow-filter)') // Apply the glow filter here        
        //.style('z-index', '3000')
        .style('pointer-events', 'all');

    citySelection.on('mouseover', function(event, d) {
        console.log("Mouseover event on city:", d.name);
        showPopup(d, event);
    }).on('mousemove', function(event, d) {
        console.log("Mousemove event on city:", d.name);
        movePopup(event);
    }).on('mouseout', function(event, d) {
        console.log("Mouseout event on city:", d.name);
        hidePopup();
        
    });
    citySelection.on('click', cityClickHandler);
    citySelection.each(function(d, i) {
        // console.log(`City drawn: ${d.name} at coordinates: ${projection(d.coordinates)}`);
    });
    console.log("Filter applied to city circles");

    console.log("Cities drawn and events attached:", citySelection.size());

    citySelection.attr('class', 'city')
    .each(function(d) {
        const appliedFilter = d3.select(this).style('filter');
      //  console.log(`Filter on city ${d.name}:`, appliedFilter);
    });
    citySelection.attr('class', 'city')
    .each(function(d) {
        const coords = projection(d.coordinates);
      //  console.log(`City ${d.name} projected at:`, coords);
    });
    console.log("All cities have been drawn and styled with the glow filter.");

    window.addEventListener('error', function(event) {
        console.error('Error caught:', event.error);    
});
}



function drawCityLabels(svg, cities, projection) {
    //console.log(`Adding labels to ${cities.length} cities`);
    svg.selectAll('.city-label')
    
        .data(cities)
        .enter().append('text')
        .attr('class', 'city-label')
        .attr('x', d => projection(d.coordinates)[0])
        .attr('y', d => projection(d.coordinates)[1] + 15)
        .text(d => d.name)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .style('font-size', '10px');

    //console.log(`City labels added: ${svg.selectAll('.city-label').size()}`);
}

  /*start of new code */

let initialX, initialY; // Variables to hold the initial position of the cursor when the popup is shown


function showPopup(cityData, event) {
    console.log('Before showing - Display: ${popup.style.display}');

    // Clear existing content of the popup
    popup.innerHTML = '';

    // Create an img element
    let image = document.createElement('img');

    // Get the base URL from the body's data attribute
    let baseUrl = document.body.getAttribute('data-base-url');

    // Use the cityImageMap to find the corresponding image file
    let png_for_city = cityImageMap[cityData.name] || 'favico.png'; // Use a default image if the city is not found

    // Construct the full path for the image
    let imagePath = baseUrl  + png_for_city;

    // Set the source of the image to the constructed path
    image.src = imagePath;
    // Set the image to scale down by 50%
    image.style.transform = 'scale(0.8)';
    image.style.transformOrigin = 'top left'; // This ensures the scaling doesn't displace the popup

    // Log the base URL from the body's data attribute
    console.log("Base URL for static files:", baseUrl);
    console.log("Full path for the image:", imagePath);

    // Add image to popup
    popup.appendChild(image);

    // Adjust the popup position and make it visible
    initialX = event.clientX;
    initialY = event.clientY;
    popup.style.display = 'block';
    popup.style.opacity = '1';
    popup.style.visibility = 'visible';
    popup.style.left = `${event.clientX}px`;
    popup.style.top = `${event.clientY}px`;
    // Adjust the popup position and make it visible
    popup.style.left = `${event.pageX}px`;
    popup.style.top = `${event.pageY}px`;

    // Scale down the entire popup by 50%
    popup.style.transform = 'scale(0.8)';
    popup.style.transformOrigin = 'top left';    
    console.log(`After showing - Display: ${popup.style.display}, Left: ${popup.style.left}, Top: ${popup.style.top}`);

}
function hidePopup() {
    const popup = document.getElementById('city-popup');
    console.log(`hidePopup called: Hiding popup, current status - Display: ${popup.style.display}`);
    popup.style.display = 'none';
    popup.style.opacity = '0';
    popup.style.visibility = 'hidden';
    console.log(`After hiding - Display: ${popup.style.display}, Opacity: ${popup.style.opacity}, Visibility: ${popup.style.visibility}`);
}
function movePopup(event) {
    const popup = document.getElementById('city-popup');
    if (!popup) {
        console.error('Popup element not found!');
        return; // Exit if the popup isn't found
    }

    // Log the initial and event coordinates
    console.log(`Initial coordinates: (${initialX}, ${initialY})`);
    console.log(`Event coordinates: (${event.clientX}, ${event.clientY})`);

    let dx = event.clientX - initialX;
    let dy = event.clientY - initialY;
    console.log(`Deltas: (dx: ${dx}, dy: ${dy})`); // Log the deltas

    let distance = Math.sqrt(dx * dx + dy * dy);
    console.log(`Distance: ${distance}`); // Log the distance

    if (distance < 800) {
        // If the distance is less than 800, reposition the popup
        popup.style.left = `${event.clientX}px`;
        popup.style.top = `${event.clientY}px`;
        console.log(`Popup repositioned to (${popup.style.left}, ${popup.style.top})`);
    } else {
        console.log("Distance threshold exceeded, hiding popup");
        hidePopup();
    }
}


function positionWaterEffect(effectDiv, popup, dx, dy) {
    const waterEffectElement = document.getElementById('water-effect-element-id'); // replace with your actual ID
    if (!waterEffectElement) {
        console.error('Water effect element not found!');
        return; // Exit the function if the water effect element is not found
    }    
    // Example positioning logic - this will need to be refined based on your exact effect and popup dimensions
    effectDiv.style.width = '100%'; // Cover the full width of the popup
    effectDiv.style.height = '20px'; // The height of the watery edge
    effectDiv.style.position = 'absolute';
    function positionWaterEffect(popup, dx, dy) {
    const waterEffectElement = document.getElementById('water-effect-element-id'); // replace with your actual ID
    if (!waterEffectElement) {
        console.error('Water effect element not found!');
        return; // Exit the function if the water effect element is not found
    }
    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal movement
        effectDiv.style.top = dy < 0 ? '0' : '100%'; // Moving up or down
        effectDiv.style.left = '0';
    } else {
        // Vertical movement
        effectDiv.style.left = dx < 0 ? '0' : '100%'; // Moving left or right
        effectDiv.style.top = '0';
        effectDiv.style.width = '20px'; // Change to a vertical bar
        effectDiv.style.height = '100%'; // Cover the full height
    }

    // Apply the CSS class with the ripple animation
    effectDiv.className = 'water-ripple-effect';
}

}
function cityClickHandler(event) {
    event.stopPropagation(); // This prevents the click from "bubbling up" to parent elements.
    // Your code to handle city click...
}

function hideAllPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        if (popup.style.display === 'block') {
            popup.style.display = 'none';
            popup.style.opacity = '0';
            popup.style.visibility = 'hidden';
        }
    });
}
  