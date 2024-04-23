# About
This server is used to receive the state of the RCSSServer from the agent and respond to it with an action. [SoccerSimulationProxy](TODO LINK) is a base that sends the state (World Model) to this server and waits for the action to send it to the RCSSServer. This base is implemented on the helios-base and has all of the features of the helios-base, such as ChainAction (Planner), and the state model of the environment is as same as the WorldModel in the helios-base. The [protobuf](TODO LINK) that we defined has covered all of the information about the environment.

# How to use
To use this server and the Soccer Simulation 2D environment, you need to install RCSSServer and SoccerWindow2, and also you need the PROXY Base. In addition, the Proxy base is dependent on the Librcsc which you need it installed on the system. The installation of these tools is explained in the following sections.

### Requirements
- [RCSSServer](TODO LINK)
- [SoccerWindow2](TODO LINK)
- [Librcsc](TODO LINK)
- [PROXY Base](TODO LINK)

### RCSSServer
RCSSServer is the server that is used to simulate the Soccer Simulation 2D environment. This application receives the actions from the agents and apply them on the environemnt and sends the state of the environment them at every cycle. The installation is explaint in [HERE](TODO LINK).

### Librcsc
This library which is developed by the [helios-base](TODO LINK) developers, has many tools that help researchers focus on their research only. This features are: handling the connection between the agent and the RCSSServer, handling the [high-level commands](TODO LINK), etc. The installation is explained in [HERE](TODO LINK).

### SoccerWindow2
This application is used to visualize the environment of the soccer game. SoccerWindow2 is connected to the RCSSServer and receives the information of the field at each cycle and visualize the field.

In addition, this application has many tools to debug the decision-making algorithems of the agents. These debug tools can be visualize or only text-based.

The installation is explained in [HERE](TODO LINK).


### PROXY Base
This base which is implemented on the helios-base, is used to send the state of the environment to the ```grpc-server``` and receive the action from it at each cycle. This base has all of the helios-base features and it sends all of the important information of the field to the ```grpc-server```.

The installation is explained in [HERE](TODO LINK).

### RUN
To run the a game that agents connect to the ```grpc-server```, you have to first run the RCSSServer and then run the SoccerWindow2. After that, you have to run the ```grpc-server``` and then run the agents. The agents will connect to the ```grpc-server``` and the ```grpc-server``` will connect to the RCSSServer.

- run the RCSSServer using the following command:
```bash
rcssserver
```

- run the SoccerWindow2 using the following command:
```bash
soccerwindow2
```

- run the ```grpc-server``` using the following command:
```bash
cd path/to/playmaker-server-nodejs
npm start
```

- run the agents using the following command:
```bash
cd path/to/soccer-simulation-proxy
./start.sh
```
Note that if you want to use the debug tools of the ```soccerwindow2```, you have to run the ```./start-debug.sh``` instead of the ```./start.sh```.

Also, instead of running the ```grpc-server``` and the agents separately, you can run the ```grpc-server``` and the agents in the same time using the following command:
```bash
cd path/to/playmaker-server-nodejs
./start-team.sh
```