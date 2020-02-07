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

components > FamilyNode > FamilyNode.tsx 

export interface IRelation {
  id: string;
  parentName?: string; 
  siblingName?: string; 
  spouseName?: string; 
  childsName?: string; 
  type: RelationType;
}

export interface IFamilyNode {
  id: string;
  gender: Gender;
  firstName: string;
  middleName?: string;
  maidenName?: string;
  lastName?: string;
  dob?: string;
  bio?: string;
  parents: IRelation[];
  children: IRelation[];
  siblings: IRelation[];
  spouse: IRelation[];
  placeholder?: boolean;
}

* [pinch-zoom-pan](https://www.npmjs.com/package/pinch-zoom-pan)
* [react-family-tree](https://www.npmjs.com/package/react-family-tree)
* [relatives-tree](https://www.npmjs.com/package/relatives-tree)