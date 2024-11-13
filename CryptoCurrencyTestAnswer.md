# Cryptocurrency Test

1. Explain what you know about layer 1 and layer 2. Use ELI5 to explain this.
    
    ## Layer 1 (L1) - The Original Highway

    Layer 1 is like the main highway where all cars (transactions) travel. This is the original layer of the blockchain, like Bitcoin or Ethereum. Just like on a real highway, the more cars there are, the more traffic jams happen. It’s the base layer, where all the transactions and data are processed. Everyone wants to use this highway, so it often gets congested, and it takes longer for cars to reach their destination. This means slower transactions and higher costs (tolls).

    ## Layer 2 (L2) - Building Extra Roads

    Layer 2 is like building a bunch of side roads to help reduce traffic on the main highway. Instead of everyone trying to cram onto the busy highway, people can take these extra side roads (called Layer 2 solutions). These are additional layers built on top of Layer 1 to help it work better by offloading some of the traffic (transactions). Once these cars are on a side road, they travel more quickly and can then merge back onto the highway closer to their destination. This way, the main highway is less crowded, and everyone can reach their destination faster.

    In blockchain terms, Layer 2 solutions like the Lightning Network (for Bitcoin) or Arbritum (for Ethereum) allow many transactions to happen off the main chain (Layer 1). Later, these transactions are added back to the main chain with much less work needed, resulting in lower fees and faster speeds. So, Layer 1 is the original base layer (like a highway), and Layer 2 is built on top of it to help make things run faster and smoother by reducing the load on Layer 1.

2. Explain this scenario, a user wants to withdraw Arbitrum using Arbitrum One Network from exchange A to exchange B but the user has a mistake copy paste the Ethereum Main Net address deposit instead of Arbitrum One Network address deposit, what will happen? Say our exchange is the exchange B as a receiver, list all possibilities for this scenario and how will you as a frontend displaying the user balance regarding this scenario?

    ## Possibile Scenario

    ### 1. **Exchange B Supports Cross-Network Deposits**
    - **Explanation**: Some exchanges have systems that detect and accept funds across different Layer 1 and Layer 2 networks, as long as the deposited asset matches the user's wallet address.
    - **Outcome**: Exchange B may recognize that the deposit came via the Arbitrum One Network, match it to the user’s **Ethereum Mainnet address**, and credit the funds to their account.
    - **User Balance Display**: The user's balance would update normally, though the deposit may take longer due to manual reconciliation or cross-network processing.

    ### 2. **Exchange B Doesn’t Support Cross-Network Deposits (Manual Handling Required)**
    - **Explanation**: If Exchange B does not automatically support cross-network deposits, the transaction could be "stuck" because the funds are on Arbitrum One while Exchange B expected an Ethereum Mainnet deposit.
    - **Outcome**: The funds would be in a "limbo" state, requiring manual intervention by Exchange B's support team to recover the funds, if possible. This could take time, and the user might need to open a support ticket.
    - **User Balance Display**: The frontend could show the deposit as Pending and provide a warning or recommendation to contact support, explicitly informing the user that deposits from different networks may not be automatically credited.

    ### 3. **Exchange B Does Not Recognize the Transaction (Funds Lost)**
    - **Explanation**: If Exchange B cannot identify the transaction and lacks procedures for handling cross-network issues, the funds might effectively be lost or extremely difficult to recover.
    - **Outcome**: The user would need to contact both Exchange A and Exchange B to see if recovery is possible, which could depend on the exchanges' internal policies and take significant time and effort.
    - **User Balance Display**: The frontend would show no change in the balance. However, it could provide a notification indicating that the deposit address was incorrect and the funds were not credited. A Failed or Incomplete transaction status might also be appropriate.

    ## Display User Balance on the Frontend

    1. **Pending Status**:
    - The transaction should initially appear as Pending. Since cross-network deposits could be resolved manually, displaying it as pending informs the user that the deposit hasn’t yet completed.

    2. **Alert/Error Message**:
    - The user should receive a warning or error indicating a potential incorrect deposit address, especially if the network does not match. The UI could suggest contacting support to resolve the issue.

    3. **Network Information Display**:
    - The UI should show the network used for the deposit (e.g., Arbitrum One Network) alongside the address. If the network does not match the user’s intended network (e.g., Ethereum Mainnet), highlight this clearly. A message such as:
        - **"Warning: The network used for this transaction does not match the intended network (Ethereum Mainnet). Please contact support for assistance."**

    ## Balance Impact

    - **If the deposit is reconciled**: The user’s balance should be updated to reflect the successful deposit.
    - **Until reconciliation**: The balance remains unaffected, with the pending transaction marked as Processing or Under Review.

3. Explain this transaction hash, include the details. 
    
    - https://mantlescan.xyz/tx/0xd43ce2aa598a75d9595a2c2779e5bf4b0375eef72a69c6d8e2b0bf5f676c66af 

    This transaction hash `0xd43ce2aa598a75d9595a2c2779e5bf4b0375eef72a69c6d8e2b0bf5f676c66af` on the Mantle blockchain represents a successful transfer of MNT tokens. Here’s a breakdown of the transaction details:

    - **Transaction Hash**: `0xd43ce2aa598a75d9595a2c2779e5bf4b0375eef72a69c6d8e2b0bf5f676c66af`
    - **Status**: Successful, meaning the transaction was confirmed and completed.
    - **Block Number**: `71145626`, which indicates the block in which this transaction was included on the Mantle blockchain.
    - **Timestamp**: November 1, 2024, at 12:39:24 UTC. This is the exact date and time the transaction was processed.
    - **From Address**: `0x0226de4A02f7080e5c00292B11aAb8A880E76618` – the sender's wallet address initiating the transfer.
    - **To Address**: `0x588846213A30fd36244e0ae0eBB2374516dA836C` – the recipient's wallet address receiving the transferred tokens.
    - **Value Transferred**: 4,341.77821641476 MNT (Mantle's native token).
    - **Gas Used**: 113,381,672 units, which is the amount of computational effort required to process this transaction.
    - **Gas Price**: 0.02 Gwei (or 0.00000000002 MNT per gas unit), showing the rate per unit of gas.
    - **Transaction Fee**: 0.00226763344 MNT. This is the total fee paid by the sender to process the transaction.
    - **Layer 1 and Layer 2 Fees**: Since Mantle is a Layer 2 solution, it splits fees between Layer 1 and Layer 2. The **L2 fee** for this transaction was 0.0017712124 MNT, and the **L1 fee** was 0.000496421 MNT.

    This transaction highlights Mantle's efficiency in processing high-value transfers with minimal fees. The reduced fees and fast transaction confirmation are central to Mantle's value as a Layer 2 scaling solution for Ethereum, making it more economical and scalable.

4. Explain about the funding fee on exchange, how it works, and how you will as a frontend displaying this to the user?

    A funding fee is a mechanism used on exchanges offering perpetual futures contracts. It’s a small payment between traders, ensuring that the futures contract price remains close to the spot market price. Unlike traditional futures, perpetual contracts lack an expiration date, so the funding fee keeps them anchored to real market values.

    - The funding fee is paid periodically. Depending on market conditions:
    - Long positions (traders betting on a price increase) pay short positions (traders betting on a decrease), or
    - Short positions pay long positions.
    
    - **Note**: The fee isn’t paid to the exchange; it’s paid between traders.

    ## Factors Determining the Funding Fee

    1. **Funding Rate**: A percentage indicating how much a position is charged or credited.
    2. **Position Size**: Larger positions incur larger fees.

    The funding rate is typically based on the difference between the perpetual contract price and the spot market price:
    - If the contract price is above the spot price, the funding rate is usually positive (longs pay shorts).
    - If below, the rate is negative (shorts pay longs).

    ## How the Funding Fee Works

    - **Positive Funding Rate**: Long positions pay a funding fee to short positions.
    - **Negative Funding Rate**: Short positions pay a funding fee to long positions.
    
    The fee is calculated periodically (e.g., every 8 hours), and only users holding positions at that time will pay or receive the fee.

    ### Example:
    Suppose you hold a **long position** of $1,000 in BTC, and the current funding rate is 0.01% for the next funding interval:
    - You would pay `$1,000 * 0.01% = $0.10` as the funding fee to traders with short positions.
    - Conversely, if the funding rate were negative, you would receive the fee instead.

    ## Displaying the Funding Fee on the Frontend

    ### 1. **Funding Rate Indicator**
    - **Current Funding Rate**: Show the current funding rate on the trading interface. Example:  
        `"Current Funding Rate: 0.01% (Long Pays Short)"`
    - **Color Coding**: Use green for positive rates (longs pay shorts) and red for negative rates (shorts pay longs).

    ### 2. **Countdown Timer for Funding Interval**
    - Add a countdown timer showing the time until the next funding payment. Example:  
        `"Next Funding Payment In: 5h 23m 15s"`
    - This helps users understand how long they have before the next funding fee applies to their position.

    ### 3. **Estimated Funding Fee Calculation**
    - For users with open positions, display the **estimated funding fee** they may pay or receive. Example:  
        `"Estimated Funding Fee: $0.50 (in 5h 23m)"`
    - Update this in real-time as position size or funding rate fluctuates.

    ### 4. **Position Summary Panel**
    - Clearly indicate the impact of the funding fee in the **position summary**:
        - **Funding Rate**: Show the rate applied to the specific position.
        - **Funding Cost or Reward**: Display the funding fee as part of the cost/reward breakdown. Example:
        ```yaml
        Position Size: $5,000
        Funding Rate: 0.02%
        Estimated Funding Fee: $1.00 (to be paid in 5h 23m)
        ```

    ### 5. **Funding History for Transparency**
    - Provide a **Funding Fee History** section where users can view all past funding fees they’ve paid or received, helping them track how funding impacts their overall profitability.
    - Example:
        | Date       | Position | Funding Rate | Fee Paid/Received |
        |------------|----------|--------------|--------------------|
        | 2024-11-10 | Long     | 0.015%       | -$1.50            |
        | 2024-11-11 | Short    | -0.010%      | +$0.80            |


    ### 6. **Warnings and Notifications**
    - Add a notification feature to alert users when the **funding rate is unusually high**, which might impact profitability. Example:  
        `"Alert: Funding rate has risen to 0.15%. Long positions will pay a higher fee at the next interval."`

5. What is network congestion? As a frontend, how will you display this to the user?

    Network congestion occurs when excessive traffic on a blockchain network exceeds its capacity to process transactions in a timely manner. When too many transactions are sent simultaneously, it overwhelms the network, leading to delays, higher transaction fees, and slower processing times.

    In blockchain networks like Ethereum, each transaction requires a fee (often called gas) to be processed by miners or validators. During congestion, the demand for network resources increases, resulting in significantly higher gas fees, as users compete to have their transactions processed sooner. This can also lead to failed transactions if a user does not set a high enough fee to compete.

    ## Display Network Congestion to Users

    ### 1. **Congestion Warning Banner**
    - Display a banner on relevant pages (e.g., transaction, withdrawal/deposit pages) when congestion is detected.
    - **Example**:  
        `"⚠️ Network Congestion Alert: The blockchain network is currently experiencing high congestion, which may result in slower transaction times and higher fees."`

    ### 2. **Estimated Transaction Time and Cost**
    - Provide estimates for transaction time and cost based on current network conditions.
    - **Example**:  
        `"Estimated Confirmation Time: 10-20 minutes (due to high congestion)"`  
        `"Estimated Transaction Fee: $25-$40 (higher due to congestion)"`
    - This helps users decide whether to proceed or wait for less congestion.

    ### 3. **Fee Customization and Suggestion**
    - Allow users to customize transaction fees with suggested options for different speeds:
        - **Low Priority**: Lower fee, slower transaction.
        - **Standard**: Moderate fee, average transaction speed.
        - **High Priority**: Higher fee, faster transaction.
    - **Example**:
        ```yaml
        Suggested Gas Fee:
        - Low Priority: $15 (20-30 min)
        - Standard: $25 (10-15 min)
        - High Priority: $40 (1-5 min)
        ```

    ### 4. **Traffic Indicator / Meter**
    - Display a visual traffic meter or congestion indicator to show the network's current state.
    - **Example**:  
        A color-coded bar (like a speedometer):
        - **Green**: Low congestion (normal transaction speeds, low fees).
        - **Yellow**: Moderate congestion (some delays, moderate fees).
        - **Red**: High congestion (long delays, high fees).

    ### 5. **Real-Time Updates**
    - Update congestion information in real-time (e.g., transaction costs and times), so users have the latest information before deciding to proceed. This prevents users from making decisions based on outdated conditions.

    ### 6. **Retry or Postpone Option**
    - If a user initiates a transaction during high congestion, offer a "Retry Later" or "Postpone" option.
    - **Example**:  
        `"Transaction Delayed Due to Congestion: Would you like to retry now or postpone until the network is less congested?"`

    ### 7. **Failure and Guidance Notifications**
    - If a transaction fails due to insufficient gas (caused by congestion), explain the reason and provide actionable suggestions.
    - **Example**:  
        `"❌ Transaction Failed: Network congestion caused insufficient gas. You can retry with a higher gas fee or wait until the congestion decreases."`
    - Include a "Retry with Suggested Fee" button for convenience.

    ### 8. **Status Page for Network Health**
    - Provide a **Network Health or Status** page where users can view detailed information about the network, including:
        - Number of pending transactions.
        - Average gas price.
        - Network capacity utilization.
    - This page can help users decide when to perform their transactions.

    ### 9. **Tooltips for Explanation**
    - Add tooltips or info buttons near congestion-related messages to explain what congestion means and how it impacts users.
    - **Example**:  
        `"ℹ️ Network Congestion: Congestion occurs when the network is busy, leading to higher fees and slower transaction speeds."`

    ## Example User Interface Elements During Network Congestion

    - **Transaction Page Warning**:  
    `"The network is experiencing heavy congestion, resulting in higher-than-normal fees. Estimated wait time: 20-30 minutes."`
    
    - **Gas Fee Customization**:  
    Options for different fees with estimated times, allowing users to control speed vs. cost.

    - **Traffic Meter**:  
    A graphic showing Red (High), Yellow (Moderate), or Green (Low) congestion levels.

    - **"Retry Later" Button**:  
    When a transaction is delayed or fails, give users the option to retry immediately or be notified when conditions improve.

    These UI features help users navigate the complexities of network congestion, providinag them with clear information and options to handle delayed or costly transactions effectively. The goal is to provide transparency and control, reducing frustration when dealing with blockchain network congestion.

6. Why do you want to work for Bitwyre?
    
    I am deeply interested and passionate about the web3 space, which is why Bitwyre feels like the perfect place for me to contribute and grow. I first became familiar with the industry back in 2017 bullrun as a FOMO user/ By 2021, I decided to take a deeper dive, focusing more on the conceptual and technological aspects of the industry. This journey from being a curious user to someone committed to understanding the technology fuels my desire to work at Bitwyre, where I can blend my foundational understanding with practical applications to contribute meaningfully to the team.