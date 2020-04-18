[Full Stack React & Firebase series](https://www.youtube.com/watch?v=RkBfu-W7tt0&list=PLMhAeHCz8S38ryyeMiBPPUnFAiWnoPvWP)
https://github.com/hidjou/classsed-react-firebase-client

## https://socialfamily-d58c8.web.app/

## 1: API Base URL

Add https://us-central1-socialfamily-d58c8.cloudfunctions.net/api as the 'proxy' value in package.json

## 2: Install packages

run `npm install`

## 3: Edit to node modules
In the below file you will need to replace two interfaces
..\social-family-react-firebase-client\node_modules\relatives-tree\src\types.ts
Please replace the following two interfaces below:

export interface IRelation {
  id: string;
  parentName?: string; 
  siblingName?: string; 
  spouseName?: string; 
  childName?: string; 
  type: RelationType;
}

export interface IFamilyNode {
  id: string;
  gender: Gender;
  firstName: string;
  middleName?: string;
  nickName?: string;
  maidenName?: string;
  lastName?: string;
  suffix?: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  bio?: string;
  parents: IRelation[];
  children: IRelation[];
  siblings: IRelation[];
  spouses: IRelation[];
  placeholder?: boolean;
}

## 4: Run project

run `npm start`

## 5: Open it

go to [http://localhost:3000](http://localhost:3000)


* [pinch-zoom-pan](https://www.npmjs.com/package/pinch-zoom-pan)
* [react-family-tree](https://www.npmjs.com/package/react-family-tree)
* [relatives-tree](https://www.npmjs.com/package/relatives-tree)

Firebase Cloud Functions - Resizing Images after Upload
https://www.youtube.com/watch?v=YGsmWKMMiYs

