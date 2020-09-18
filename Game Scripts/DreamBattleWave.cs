using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DreamBattleWave : MonoBehaviour
{
    public GameObject[] hazards;
    public Vector2 spawnValues;
    public int hazardCount;
    public float spawnWait;
    public float startWait;
    public float waveWait;
    public float waveRate = 1;

    public GameController gameController;

    private void Start()
    {
        gameController = gameController.GetComponent<GameController>();
        StartCoroutine(SpawnWaves());
    }



    IEnumerator SpawnWaves()
    {
        yield return new WaitForSeconds(startWait);
        while (true)
        {
            for (int i = 0; i < hazardCount; i++)
            {
                GameObject hazard = hazards[Random.Range(0, hazards.Length)];
                Vector2 spawnPosition = new Vector2(Random.Range(-spawnValues.x, spawnValues.x), spawnValues.y);
                Quaternion spawnRotation = Quaternion.identity;
                Instantiate(hazard, spawnPosition, spawnRotation);
                waveWait *= waveRate;
                yield return new WaitForSeconds(spawnWait);
            }
            yield return new WaitForSeconds(waveWait);

            if (gameController.gameOver)
            {
                //RestartText.text = "Press 'L' for Restart";
                //restart = true;
                break;
            }
        }

    }
}
