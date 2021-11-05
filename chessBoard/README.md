# Minimum steps to reach target by a Knight

# Algorithm
    1. Define a class that has following data variables:
          1. x: to store x-coordinate of the cell.
          2. y: to store y-coordinate of the cell.
    2. steps: number of steps required to reach that cell starting from co-ordinates of the Knight.
    3. Create a BFS queue that stores class objects as nodes.
    4. Begin the Iterative BFS traversal.
    5. In every step of the iterative traversal, pop a node from the queue. say,the node is front.
    6. If the cell at coordinates (front.y, front.x) is the target cell, return the value of front.steps.
        Else, continue the iterative traversal.

