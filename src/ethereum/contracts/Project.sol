pragma solidity ^0.4.17;

contract ProjectFactory {
    address [] public deployedProjects;

    function createProject(uint minimum) public {
        address newProject = new Project(minimum, msg.sender);
        deployedProjects.push(newProject);
    }

    function getDeployedProjects() public view returns (address []) {
        return deployedProjects;
    }
}

contract Project {
    //프로젝트 투자자
    struct Investor {
        address investorAddress;
        uint donation;
    }
    // 프로젝트 메니져의 요청 사항
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Investor [] public investors;
    Request [] public requests;
    address public manager;
    uint public minimumDonation;
    
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Project(uint minimum, address creator) public {
        manager = creator;
        minimumDonation = minimum;
    }

    function invest() public payable {
        require(msg.value > minimumDonation);
        if(approvers[msg.sender]) {
            for(uint i = 0; i < investors.length; i++) {
                if(investors[i].investorAddress == msg.sender) {
                    Investor storage investor = investors[i];
                    investor.donation += msg.value;
                }
            }
        } else {
            approvers[msg.sender] = true;
       
            Investor memory newInvestor = Investor({
                investorAddress: msg.sender,
                donation: msg.value
            });
            
            investors.push(newInvestor);
            approversCount++;
        }
        
        sort();
    }
    
    function sort () public {
        uint length = investors.length;
        for(uint i = 0; i < length; i++) {
            for(uint j = 0; j < length - i - 1; j++) {
                if(investors[j].donation < investors[j+1].donation ) {
                    Investor memory temp = investors[j+1];
                    investors[j+1] = investors[j];
                    investors[j] = temp;
                }
            }
        }
    }
    

    function createRequest (string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    // 요청 승인에 투표
    function approveRequest(uint index) public {
        Request storage request = requests[index];

        // 이 함수를 호출하는 사람이 투자했는지 확인.
        require(approvers[msg.sender]);
        // 이 함수를 호출 한 사람이 전에 투표하지 않았는지 확인.
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    // 요청이 과반수 이상 되었을 시 요청 종료 후 요청액 자동 송금
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        // 전체 투자자중 과반수 이상 투표했는지 확인.
        require(request.approvalCount > (approversCount / 2));
        // 요청이 완료되지 않았는지 확인
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    // 프로젝트 요약 데이터
    function getSummary() public view returns (
       uint, uint, uint, uint, address
    ) {
      return (
        minimumDonation,
        this.balance,
        requests.length,
        approversCount,
        manager
      );
    }

    function getRequestCount() public view returns (uint) {
      return requests.length;
    }
}
