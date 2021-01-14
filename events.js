//--------------------//
// Future plans
//--------------------//

// Future planned talks: 

// Journal clubs to-do:

// https://openreview.net/pdf?id=SkfMWhAqYQ and joint with: https://openreview.net/pdf?id=Bygh9j09KX

// https://www.sciencedirect.com/science/article/pii/S0896627318309954

// {
	// 	"title":"Population dynamics of choice representation in dorsal premotor and primary motor cortex",
	// 	"author":"TBD",
	// 	"type":"Journal Club",
	// 	"date":"2018/MM/DD",
	// 	"link":"https://www.biorxiv.org/content/early/2018/03/17/283960",
	// 	"abstract":""
	// },




// Events code -- load the .json file and parse it, then add the appropriate modal windows
// and upcoming / past events


	////////////////////////////////////////////////////////////////////////////////
	////////////////////							Example talk							////////////////////
	////////////////////////////////////////////////////////////////////////////////

	// {
	// 	"title":"TBA",
	// 	"author":"Firstname Lastname",
	// 	"type":"Talk",
	// 	"date":"YYYY/MM/DD",
	// 	"info":"Dept of X, University of Y",
	// 	"image":"imagefile.imageext",
	// 	"abstract":""
	// },

	////////////////////////////////////////////////////////////////////////////////
	////////////////////					Example journal club					////////////////////
	////////////////////////////////////////////////////////////////////////////////

	// {
	// 	"title":"TBA",
	// 	"author":"Firstname Lastname",
	// 	"type":"Journal Club",
	// 	"date":"YYYY/MM/DD",
	// 	"link":"https://TBA.com",
	// 	"abstract":""
	// },


	////////////////////////////////////////////////////////////////////////////////
	////////////////////						Actual data here						////////////////////
	////////////////////////////////////////////////////////////////////////////////

	
	var events = [	
	{
		"title":"Computational Neuroscience Center Seminar: Neural dynamics shape task organization in multitask networks",
		"author":"Laura Driscoll",
		"type":"Talk",
		"date":"2021/01/15",
		"info":"Postdoctoral Fellow, Stanford University",
		"prefix":"driscoll",
		"abstract":"Little is known about how computations for multiple tasks interact within a single network of neurons because their activity is primarily studied during the performance of a single task. To investigate neural network flexibility for multiple computations, we trained biologically inspired recurrent neural networks (RNNs) to perform a diverse set of sensorimotor and cognitive tasks. Building on previous work that initially characterized neural representations at single snapshots in time, we found that network activity patterns are organized such that the same dynamical elements (fixed points, line attractors, etc.) can be shared across tasks that require similar computations. This property minimizes the redundancy of neural dynamics across all tasks. For example, in two category tasks, the network aligns the initial state of the dynamical system for each task such that the same region of neural state space is reused to implement the same category boundary computation. Shared dynamical components result in similar task computations operating closer together in neural state space. The particular set of tasks employed dictates which features are shared. These observations highlight the value in dynamical systems analysis for the study of neural computation."
	},
	{
		"title":"Synthesizing sentences from BCIs",
		"author":"Gopala Anumanchipalli",
		"type":"Talk",
		"date":"2021/02/19",
		"info":"Weill Institute for Neuroscience, UCSF",
		"prefix":"anumanchapalli",
		"abstract":""
	},
	{
		"title":"Neural reinforcement: re-entering and refining neural dynamics leading to desirable outcomes.",
		"author":"Vivek Athalye",
		"type":"Talk",
		"date":"2020/12/11",
		"info":"Columbia University",
		"prefix":"athalye",
		"abstract":""
	},
	{
		"title":"Hippocampal-cortical coordination and memory processing",
		"author":"Jai Yu",
		"type":"Talk",
		"date":"2020/11/13",
		"info":"University of Chicago",
		"prefix":"yu",
		"abstract":""
	},
	{
		"title":"Neural processing for flexible behavior in the Drosophila taste system",
		"author":"Anita Devineni",
		"type":"Talk",
		"date":"2020/10/16",
		"info":"Department of Neuroscience, Columbia Unviersity",
		"prefix":"devineni",
		"abstract":""
	}
	// {
	// 	"title":"TBA",
	// 	"author":"Firstname Lastname",
	// 	"type":"Talk",
	// 	"date":"YYYY/MM/DD",
	// 	"info":"Dept of X, University of Y",
	// 	"image":"default.jpg",
	// 	"abstract":""
	// } // last talk has no comma
	];
