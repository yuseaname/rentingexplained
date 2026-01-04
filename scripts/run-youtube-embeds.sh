#!/bin/bash
# Quick-start script for YouTube embed automation on Unix/Mac/Linux
# Run this from the scripts directory: ./run-youtube-embeds.sh

set -e  # Exit on error

echo "========================================"
echo "YouTube Video Embed Automation"
echo "========================================"
echo

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 not found. Please install Python 3.11+"
    exit 1
fi

python3 --version

# Check if yt-dlp is installed
if ! command -v yt-dlp &> /dev/null; then
    echo "yt-dlp not found. Installing dependencies..."
    pip3 install -r requirements-youtube-embeds.txt
    echo
    echo "Dependencies installed successfully!"
    echo
fi

# Function to show menu
show_menu() {
    echo
    echo "What would you like to do?"
    echo
    echo "1. DRY RUN - Preview without making changes (RECOMMENDED FIRST)"
    echo "2. APPLY - Actually insert videos into blog posts"
    echo "3. DRY RUN with custom score threshold"
    echo "4. Exit"
    echo
}

# Function for dry run
run_dryrun() {
    echo
    echo "Running DRY RUN (no files will be modified)..."
    echo
    python3 add_youtube_embeds.py --root "../content" --dry-run
    echo
    echo "========================================"
    echo "DRY RUN COMPLETE"
    echo "========================================"
    echo "Review the report: youtube_embed_report.json"
    echo
    read -p "Press Enter to continue..."
}

# Function to apply changes
run_apply() {
    echo
    echo "========================================"
    echo "WARNING: This will modify your files!"
    echo "========================================"
    echo "Backups will be created (.bak files)"
    echo
    read -p "Are you sure? Type YES to continue: " confirm
    if [ "$confirm" != "YES" ]; then
        echo "Cancelled."
        return
    fi
    echo
    echo "Running with --apply flag..."
    echo
    python3 add_youtube_embeds.py --root "../content" --apply
    echo
    echo "========================================"
    echo "PROCESSING COMPLETE"
    echo "========================================"
    echo "Files have been modified. Review changes and commit to git."
    echo
    read -p "Press Enter to continue..."
}

# Function for custom threshold
run_custom() {
    echo
    read -p "Enter minimum score threshold (0.0-1.0, default 0.78): " threshold
    threshold=${threshold:-0.78}
    echo
    echo "Running DRY RUN with score threshold: $threshold"
    echo
    python3 add_youtube_embeds.py --root "../content" --dry-run --min-score "$threshold"
    echo
    echo "========================================"
    echo "DRY RUN COMPLETE"
    echo "========================================"
    echo "Review the report: youtube_embed_report.json"
    echo
    read -p "Press Enter to continue..."
}

# Main menu loop
while true; do
    show_menu
    read -p "Enter choice (1-4): " choice
    
    case $choice in
        1)
            run_dryrun
            ;;
        2)
            run_apply
            ;;
        3)
            run_custom
            ;;
        4)
            echo
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo "Invalid choice. Please try again."
            ;;
    esac
done
