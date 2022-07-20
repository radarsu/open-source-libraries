## Concepts

### Command center

Machine you operate on launching missions. Command center requires Node.js to be installed.

### Hosts

Machines you launch missions at.

### Missions

Group of steps to perform on target hosts to achieve desired result.

### Step

Smallest unit of work to perform on target machine. If mission fails at some point, each step is being rolled back in reverse order.

## Usage

`npx missioner launch --missions=<missionName1>,<missionName2> --tag=radrat.pl` - Run script on all hosts matching tag.
`npx missioner rollback --mission-id=<uniqueMissionIdentifier> --to-step=<stepNumber=0> --tag=radrat.pl` - Run script on all hosts matching tag.

## How it works?

1. When starting mission, missioner generates uniqueMissionIdentifier (unique per mission, not per host) and builds binary bundle with mission to be executed on target host.
2. Binary is being sent to target host `~/.missioner/missions/${uniqueMissionIdentifier}/launch` directory.
3. Binary is being executed on target host and stream of output is being redirected to parent.
4. Also, output stream is being written down to `~/.missioner/missions/${uniqueMissionIdentifier}/launch.log`.
5. After each step's correct execution, index of current step of mission is recorded in `~/.missioner/missions/${uniqueMissionIdentifier}/data.json`.
6. If the step fails, it will automatically trigger it's rollback function, mission then can be relaunched from the last successful step.
