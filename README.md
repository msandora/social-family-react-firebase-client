[Full Stack React & Firebase series](https://www.youtube.com/watch?v=RkBfu-W7tt0&list=PLMhAeHCz8S38ryyeMiBPPUnFAiWnoPvWP)

## https://socialfamily-d58c8.web.app/


## 1: API Base URL

Add https://us-central1-socialfamily-d58c8.cloudfunctions.net/api as the 'proxy' value in package.json

## 2: Install packages

run `npm install`

## 3: Run project

run `npm start`

## 4: Open it

go to [http://localhost:3000](http://localhost:3000)

## 5: Edit to node modules

..\social-family-react-firebase-client\node_modules\relatives-tree\src\types.ts

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
  maidenName?: string;
  lastName?: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  bio?: string;
  parents: IRelation[];
  children: IRelation[];
  siblings: IRelation[];
  spouses: IRelation[];
  placeholder?: boolean;
}

* [pinch-zoom-pan](https://www.npmjs.com/package/pinch-zoom-pan)
* [react-family-tree](https://www.npmjs.com/package/react-family-tree)
* [relatives-tree](https://www.npmjs.com/package/relatives-tree)


https://github.com/CryceTruly/trulyImages


https://www.youtube.com/watch?v=YGsmWKMMiYs
https://github.com/academind/firebase-cloud-functions-introduction/tree/01-storage