class Cell
{
    constructor(x,y,dis)
    {
        this.x = x;
        this.y = y;
        this.dis = dis;
    }
}

function isInside(x,y,N) {
    if (x >= 1 && x <= N && y >= 1 && y <= N) {
        return true;
    }
    return false;
}

function minStepToReachTarget(knightPosition, targetPosition, N) {
    if (!knightPosition || !targetPosition || !N) {
        console.log('Cannot run the code without providing kignht current, traget positions and chessboard size, Please provide input data like this "knightPos=[1,1] targetPos=[8,8] sizeOfBoard=8"');
        process.exit(1);
    }
    let dx = [ -2, -1, 1, 2, -2, -1, 1, 2 ];
    let dy = [ -1, -2, -2, -1, 1, 2, 2, 1 ];
    const q = [];
    q.push(new Cell(knightPosition[0], knightPosition[1], 0));
    let t;
    let x, y;
    let visit = new Array(N + 1);

    for (let i = 1; i <= N; i++)
    {
        visit[i]=new Array(N+1);
        for (let j = 1; j <= N; j++)
            visit[i][j] = false;
    }
    visit[knightPosition[0]][knightPosition[1]] = true;
    while (q.length!=0) {
        t = q.shift();
        if (t.x == targetPosition[0] && t.y == targetPosition[1])
            return t.dis;
        for (let i = 0; i < 8; i++) {
            x = t.x + dx[i];
            y = t.y + dy[i];
            if (isInside(x, y, N) && !visit[x][y]) {
                visit[x][y] = true;
                q.push(new Cell(x, y, t.dis + 1));
            }
        }
    }
    return Number.MAX_VALUE;
}
const processArgsObj =  process.argv.slice(2).reduce((processArgs, val) => {
    let [key, value] = val.split('=');
    processArgs[key] = value;
    return processArgs;
}, {})
console.log(minStepToReachTarget(JSON.parse(processArgsObj.knightPos), JSON.parse(processArgsObj.targetPos), Number(processArgsObj.sizeOfBoard)));