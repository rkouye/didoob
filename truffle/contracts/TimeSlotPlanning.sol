pragma solidity ^0.4.18;

contract TimeSlotVote {
   
   //The owner of the vote
   address public owner;
   
   //How long the time slot should be in milliseconds
   uint64 public span_in_ms;
   
   //Allowed voters
   address[] public voters;
   mapping(address => bool) public votersMap;
   function getVoters() public view returns (address[]) {
       return voters;
   }
   
   struct TimeSlotProposal {
       uint64 slot_start_proposal;
       bool approved;
       address author;
       mapping(address => bool) votes;
   }
   
   mapping(uint64 => TimeSlotProposal) public proposals;
   uint64 public numberOfProposal;
   function haveVotedProposal(uint64 proposalIndex, address voter) 
   public view returns (bool) {
        return proposals[proposalIndex].votes[voter];
    }
   function getProposals() 
   public view returns (uint64[] starts, bool[] approveds, address[] authors, bool[] votes) {
        starts = new uint64[](numberOfProposal);
        approveds = new bool[](numberOfProposal);
        authors = new address[](numberOfProposal);
        votes = new bool[](numberOfProposal*voters.length);
        
        for(uint64 i = 0; i < numberOfProposal; i++){
            starts[i] = proposals[i].slot_start_proposal;
            approveds[i] = proposals[i].approved;
            authors[i] = proposals[i].author;
        
            for(uint64 j = 0; j < voters.length; j++){
                votes[i*voters.length+j] = proposals[i].votes[voters[j]];
            }
        }
       
        return (starts, approveds, authors, votes);
    }

   function TimeSlotVote(uint64 _span_in_ms, address[] _voters ) public{
       owner = msg.sender;
       span_in_ms = _span_in_ms;
       voters = _voters;
       //For performance reason
       require(voters.length < 21);
       for(uint64 i = 0; i < voters.length; i++){
           votersMap[voters[i]] = true;
       }
   }
   
   function makeProposalAsOwner(uint64 _slot_start_proposal) public onlyOwner {
       TimeSlotProposal storage p = proposals[numberOfProposal++];
       p.slot_start_proposal = _slot_start_proposal;
       p.author = msg.sender;
       p.approved = true;
   }
   
   function makeProposalAsVoter(uint64 _slot_start_proposal) public onlyVoters {
       TimeSlotProposal storage p = proposals[numberOfProposal++];
       p.slot_start_proposal = _slot_start_proposal;
       p.author = msg.sender;
       p.approved = false;
   }
   
   function approveProposal(uint64 proposalIndex) public onlyOwner
        onlyIfProposalExistAtIndex(proposalIndex){
       proposals[proposalIndex].approved = true;
   }
   
   function voteForProposalAtIndex(uint64 proposalIndex) public onlyVoters
    onlyIfProposalExistAtIndex(proposalIndex)
    onlyIfProposalIsApproved(proposals[proposalIndex]){
       proposals[proposalIndex].votes[msg.sender] = true;
   }
   
   modifier onlyOwner {
        require(msg.sender == owner);
        _;
   }
   
   modifier onlyVoters {
       require(votersMap[msg.sender]);
       _;
   }
   
   modifier onlyIfProposalExistAtIndex(uint64 proposalIndex){
       require(proposalIndex<numberOfProposal);
       _;
   }
   
   modifier onlyIfProposalIsApproved(TimeSlotProposal p){
       require (p.approved);
       _;
   }
   function close() public onlyOwner {
        selfdestruct(owner);
   }
}