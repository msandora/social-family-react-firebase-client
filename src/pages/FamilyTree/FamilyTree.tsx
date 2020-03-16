import React, { useState, useCallback } from 'react';
import PinchZoomPan from 'pinch-zoom-pan';
import { IFamilyNode, IFamilyExtNode } from 'relatives-tree';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from '../../components/FamilyNode/FamilyNode';
import styles from '../FamilyTree/Family.module.css';
import nodes from '../../data/family.json';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const myID = 'palmasandora';

const WIDTH = 70;
const HEIGHT = 110;

export default React.memo<{}>(
  function FamilyTree() {

    const [menuActive, setMenuState] = useState(false);

    const [rootId, setRootId] = useState<string>(myID);
    const onResetClick = useCallback(() => setRootId(myID), []);

    // const boxClick = () => { 
    //   console.log('Sandora-Lavalle:');    
    // };
    return (
      <Grid container spacing={16}>
        <Grid item sm={9} xs={12}>
          <div className={styles.root}>
            <header className={styles.header}>
              <Typography variant="h5">Lineage</Typography>
            </header>
            <PinchZoomPan
              //debug
              captureWheel
              min={0.3}
              max={2.5}
              className={styles.wrapper}>
              <ReactFamilyTree 
                nodes={nodes as IFamilyNode[]}
                rootId={rootId}
                width={WIDTH}
                height={HEIGHT}
                canvasClassName={`${styles.tree} ${menuActive ? `${styles.ADDED_CLASS}` : ""}`}
                renderNode={(node: IFamilyExtNode) => (
                  <FamilyNode
                    key={node.id}
                    node={node}
                    isRoot={node.id === rootId}
                    onSubClick={setRootId}
                    style={{
                      top: "10px",
                      width: WIDTH,
                      height: HEIGHT,
                      transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                    }}
                  />
                )}
              />
            </PinchZoomPan>
            {rootId !== myID && (
              <div className={styles.reset} onClick={onResetClick}>Reset</div>
            )}
          </div>
				</Grid>
        <Grid item sm={3} xs={12}>
          <Button 
            className={styles.button}
            onClick={() => setMenuState(!menuActive)}
            variant="contained" 
            size="medium" color="primary" fullWidth>
            Sandora-Lucatuorto
          </Button>
          <Button 
            className={styles.button}
            onClick={() => setMenuState(!menuActive)}
            //className={`${menuActive ? "ADDED_CLASS" : ""}`}
            // onClick={boxClick}
            variant="contained" 
            size="medium" color="primary" fullWidth>
            Sandora-Gentile
          </Button>
          <Button 
            className={styles.button}
            onClick={() => setMenuState(!menuActive)}
            variant="contained" 
            size="medium" color="primary" fullWidth>
            Sandora-Scott
          </Button>
          <Button 
            className={styles.button}
            onClick={() => setMenuState(!menuActive)}
            variant="contained" 
            size="medium" color="primary" fullWidth>
            Sandora-Periera
          </Button>
        </Grid>
      </Grid>
    );
  }
);
