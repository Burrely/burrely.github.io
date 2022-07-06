
//Chart.js

var chartJSChart;

function changeChartValue(item, newValue, event) {
    if (event == null) { // Assume onblur
        chartJSChart.data.datasets[0].data[item] = newValue;
        chartJSChart.update();
    } else {
        if (event.keyCode === 13) {
            chartJSChart.data.datasets[0].data[item] = newValue;
            chartJSChart.update();
        }
    }
}


// window load

window.addEventListener('load', () => {

    // UWU nonsense
    var path = anime.path('svg#uwu_path path');

    anime({
        targets: '.advancedJavascript.pathFollower:nth-child(1)',
        translateX: path('x'),
        translateY: path('y'),
        rotate: path("angle"),
        easing: 'linear',
        duration: 10000,
        loop: true,
    });
    anime({
        targets: '.advancedJavascript.pathFollower:nth-child(1) h1',
        keyframes: [
            { scale: 2, duration: 0 },
            { scale: () => { return anime.random(2, 3); } },
            { scale: 2 },
        ],
        easing: 'linear',
        duration: 10000,
        loop: true,
    });

    setTimeout(() => {
        anime({
            targets: '.advancedJavascript.pathFollower:nth-child(2)',
            translateX: path('x'),
            translateY: path('y'),
            rotate: path("angle"),
            easing: 'linear',
            duration: 10000,
            loop: true,
        });
        anime({
            targets: '.advancedJavascript.pathFollower:nth-child(2) h1',
            keyframes: [
                { scale: 2, duration: 0 },
                { scale: () => { return anime.random(2, 3); } },
                { scale: 2 },
            ],
            easing: 'linear',
            duration: 10000,
            loop: true,
        });
    }, 250);

    setTimeout(() => {
        anime({
            targets: '.advancedJavascript.pathFollower:nth-child(3)',
            translateX: path('x'),
            translateY: path('y'),
            rotate: path("angle"),
            easing: 'linear',
            duration: 10000,
            loop: true,
        });
        anime({
            targets: '.advancedJavascript.pathFollower:nth-child(3) h1',
            keyframes: [
                { scale: 2, duration: 0 },
                { scale: () => { return anime.random(2, 3); } },
                { scale: 2 },
            ],
            easing: 'linear',
            duration: 10000,
            loop: true,
        });
    }, 500);
    

    // Charty boy
    var chartCanvasContext = document.getElementById('ChartJS').getContext("2d");
    chartJSChart = new Chart(chartCanvasContext, {
        type: 'bar',
        data: {
            labels: ['Rood', 'Blauw', 'Geel', 'Groen', 'Paars', 'Oranje'],
            datasets: [{
                label: 'kwantiteit',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    
    // Three.js, not the fourth dimension.

    var threeJSCubeHuePos = 0;
    function setThreeJSCubeHuePos(newValue) {
        threeJSCubeHuePos = newValue%360; return threeJSCubeHuePos;
    }

    var scene3D = new THREE.Scene();
    var containerElement = document.getElementById("ThreeJSExample");
    var camera = new THREE.PerspectiveCamera( 75, 320/320, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( 320, 320 );
    containerElement.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene3D.add( cube );

    camera.position.z = 1.5;

    var animate = function () {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.material.color = new THREE.Color("hsl("+String(setThreeJSCubeHuePos(threeJSCubeHuePos+1))+", 100%, 50%)");

        renderer.render( scene3D, camera );
    };
    
    animate();
    
});
