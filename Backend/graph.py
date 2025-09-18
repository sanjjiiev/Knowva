# graph.py
from langgraph.graph import StateGraph, END
from agents import ExplanationAgent, PracticeAgent, RevisionAgent
from typing import Dict, Any

class State(dict):
    pass

# Build the workflow
workflow = StateGraph(State)

# Node: Explain
def node_explain(state: State) -> State:
    query = state.get("query", "").strip()
    context = state.get("context", "")
    if not query:
        query = "Explain the provided context"
    explanation = ExplanationAgent.run(user_query=query, context=context)
    state["explanation"] = explanation
    return state

# Node: Practice
def node_practice(state: State) -> State:
    query = state.get("query", "").strip()
    context = state.get("context", "")
    practice = PracticeAgent.run(user_query=query or "Practice based on context", context=context, n_problems=3)
    state["practice"] = practice
    return state

# Node: Revision
def node_revision(state: State) -> State:
    user_id = state.get("user_id", "anon")
    context = state.get("context", "")
    # Graph receives a db fetch function via state (injected at invocation time)
    db_fetch_fn = state.get("db_fetch_fn")
    if not db_fetch_fn:
        # fallback: return empty revision note
        state["revision"] = "No revision data available."
        return state
    revision = RevisionAgent.run(user_id=user_id, last_context=context, db_fetch_fn=db_fetch_fn, n_questions=2)
    state["revision"] = revision
    return state

# Add nodes and edges
workflow.add_node("explain", node_explain)
workflow.add_node("practice", node_practice)
workflow.add_node("revision", node_revision)

workflow.set_entry_point("explain")
workflow.add_edge("explain", "practice")
workflow.add_edge("practice", "revision")
workflow.add_edge("revision", END)

# compile graph
graph = workflow.compile()
