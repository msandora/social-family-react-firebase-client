import React from 'react';
import classNames from 'classnames';
import { IFamilyExtNode } from 'relatives-tree';
import styles from './FamilyNode.module.css';
import Modal from '../FamilyModal/Modal';
import useModal from '../FamilyModal/useModal';


interface Props {
  node: IFamilyExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

export default React.memo<Props>(
  function FamilyNode({ node, isRoot, onSubClick, style }) {
    
    const {isShowing, toggle} = useModal();

    return (
      <div>
        <div className={styles.root} style={style}>
            <div 
              onClick={toggle}
              className={classNames(
                styles.inner,
                styles[node.gender],
                isRoot && styles.isRoot,
              )} 
            >
            <Modal 
              person={{firstName:node.firstName , lastName:node.lastName}}
              isShowing={isShowing}
              hide={toggle}
            />
          </div>
            <div className={styles.namePlate}>
              {node.firstName ? node.firstName : node.id }<br/> {node.lastName} 
            </div>
          {node.hasSubTree && (
            <div
              className={classNames(styles.sub, styles[node.gender])}
              onClick={() => onSubClick(node.id)}
            />
          )}
        </div>
      </div>
    );
  }
);

