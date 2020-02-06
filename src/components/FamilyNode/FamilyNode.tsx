import React from 'react';
import classNames from 'classnames';
import { IFamilyExtNode } from 'relatives-tree';
import styles from './FamilyNode.module.css';
import PersonDialog from '../FamilyModal/PersonDialog';


interface Props {
  node: IFamilyExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}
export default React.memo<Props>(
  function FamilyNode({ node, isRoot, onSubClick, style }) {

    if(node.firstName === 'Mark') {
      console.log('parent', node.parents[0]);
      console.log('father', node.parents[0].id);
      console.log('mother', node.parents[1].id);
      console.log('sibling', node.siblings[0].id);
      console.log('sibling', node.siblings[1].id);
    }

    return (
      <div>
        <div className={styles.root} style={style}>
            <div 
              className={classNames(
                styles.inner,
                styles[node.gender],
                isRoot && styles.isRoot,
              )} 
            >
            <PersonDialog 
              person={{ firstName:node.firstName, middleName:node.middleName, lastName:node.lastName, dob:node.dob, bio:node.bio }}/>
          </div>
            <div className={styles.namePlate}>
              {node.firstName ? node.firstName : node.id }
              <br/> {node.lastName} 
            </div>
            {/* 
            {node.hasSubTree && (
              <div
                className={classNames(styles.sub, styles[node.gender])}
                onClick={() => onSubClick(node.id)}
              />
            )}
            */}
        </div>
      </div>
    );
  }
);

