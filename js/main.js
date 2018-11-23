$(document).ready(function() {


        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = 1000;
        canvas.height = 500;

        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        var canvasFromTop = canvas.offsetTop;
        
        var ballSize = 10;
        var ballX = canvasWidth / 2 - ballSize / 2;
        var ballY = canvasHeight / 2 - ballSize / 2;

        var stickWidth = 20;
        var stickHeight = 100;

        var stickPlayerX = 70;
        var stickComputerX = 910;

        var stickPlayerY = 200;
        var stickComputerY = 200;

        var stickSpeedFast = 15;
        var stickSpeedMedium = 8;
        var stickSpeedSlow = 4;

        var lineWidth = 6;
        var lineHeight = 16;

        var ballSpeedX = 0;
        var ballSpeedY = 0;

        var playerPoints = 0;
        var computerPoints = 0;


        function player() {
            ctx.fillStyle = '#7FFF00';
            ctx.fillRect(stickPlayerX, stickPlayerY, stickWidth, stickHeight);
        }

        function movePlayer(e) {
            stickPlayerY = e.clientY - canvasFromTop - stickHeight / 2;
            if(stickPlayerY <= 0) {
                stickPlayerY = 0;
            } else if(stickPlayerY + stickHeight >= canvasHeight) {
                stickPlayerY = canvasHeight - stickHeight;
            }
        }

        function moveComputer(stickSpeedFast, stickSpeedMedium, stickSpeedSlow) {
            var middleStickComputer = stickComputerY + stickHeight / 2;
            var middleBall = ballY + ballSize;

            if(ballX + ballSize < 250) {
                if(middleStickComputer - middleBall > 100) {
                    stickComputerY -= stickSpeedSlow;
                } else if(middleStickComputer - middleBall < -100) {
                    stickComputerY += stickSpeedSlow;
                }
            
            } else if(ballX + ballSize >= 250) {
                if(middleStickComputer - middleBall > 200) {
                    stickComputerY -= stickSpeedFast;
                } else if(middleStickComputer - middleBall > 40) {
                    stickComputerY -= stickSpeedMedium;
                } else if(middleStickComputer - middleBall < -200) {
                    stickComputerY += stickSpeedFast;
                } else if(middleStickComputer - middleBall < -40) {
                    stickComputerY += stickSpeedMedium;
                }
            }

            console.log(stickSpeedFast);
        }


        function computer() {
            ctx.fillStyle = 'red';
            ctx.fillRect(stickComputerX, stickComputerY, stickWidth, stickHeight);
        }

        function ball() {
            //ctx.fillStyle = 'white';
            //ctx.fillRect(ballX, ballY, ballSize, ballSize);
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballSize, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.stroke(); 

            ballX += ballSpeedX;
            ballY += ballSpeedY;

            if(ballX + ballSize >= canvasWidth + 10 || ballX - ballSize <= -10) {
                ballSpeedX = -ballSpeedX;
                ballSpeedUp();
            }

            if(ballY + ballSize >= canvasHeight || ballY - ballSize <= 0) {
                ballSpeedY = -ballSpeedY;
                ballSpeedUp();
            }

            // paletka gracza 
            if(ballX <= stickPlayerX + stickWidth &&
                ballX >= stickPlayerX && 
                ballY + ballSize >= stickPlayerY &&
                ballY <= stickPlayerY + stickHeight) {
                    ballSpeedX = -ballSpeedX;
                    ballX = stickPlayerX + stickWidth;
                    ballSpeedUp();
                }
            //paletka computera
            if(ballX + ballSize >= stickComputerX &&
                ballX + ballSize <= stickComputerX + stickWidth &&
                ballY + ballSize >= stickComputerY &&
                ballY <= stickComputerY + stickHeight) {
                    ballSpeedX = -ballSpeedX;
                    ballX = stickComputerX - ballSize;
                    ballSpeedUp();
                }    
        }

        function ballSpeedUp() {
            if(ballSpeedX > 0 && ballSpeedX <= 16) {
                ballSpeedX += 0.2;
            } else if(ballSpeedX < 0 && ballSpeedX >= -16) {
                ballSpeedX -= 0.2;
            }
            if(ballSpeedY > 0 && ballSpeedY <= 16) {
                ballSpeedY += 0.2;
            } else if(ballSpeedY < 0 && ballSpeedY >= -16) {
                ballSpeedY -= 0.2;
            }

            console.log(ballSpeedX);
        }

        function table() {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            for(var lineY = 20; lineY < canvasHeight; lineY += 30) {
                ctx.fillStyle = "gray";
                ctx.fillRect(canvasWidth / 2 - lineWidth / 2, lineY, lineWidth, lineHeight);
            }
        }

        function score() {
        ballX = canvasWidth / 2 - ballSize / 2;
        ballY = canvasHeight / 2 - ballSize / 2;

        stickPlayerX = 70;
        stickComputerX = 910;

        stickPlayerY = 200;
        stickComputerY = 200;

        stickSpeedFast = 15;
        stickSpeedMedium = 8;
        stickSpeedSlow = 4;

        if((playerPoints + computerPoints) % 2 === 0 ) {
            ballSpeedX = 3;
        } else {
            ballSpeedX = -3;
        }
        ballSpeedY = 3;
        }

        function game() {
            table();
            ball();
            player();
            computer();
            if(ballSpeedX === 0 && ballSpeedY === 0) {
            canvas.addEventListener("click", function() {
                ballSpeedX = 3;
                ballSpeedY = -3;
            });
            } else {
                canvas.addEventListener('mousemove', movePlayer);
                moveComputer(stickSpeedFast, stickSpeedMedium, stickSpeedSlow);
            }

             if(ballSpeedX > 8 || ballSpeedX < -8) {
                stickSpeedFast = 18;
                stickSpeedMedium = 11;
                stickSpeedSlow = 7;
            } else if(ballSpeedX > 14 || ballSpeedX < -14) {
                stickSpeedFast = 21;
                stickSpeedMedium = 14;
                stickSpeedSlow = 10;
            }
            if(ballX - ballSize <= 0) {
                score();
                computerPoints += 1;
                $('.computer').html(computerPoints);
            } else if(ballX + ballSize >= canvasWidth) {
                score();
                playerPoints += 1;
                $('.player').html(playerPoints);
            }
        }
        setInterval(game, 1000 / 60);
});